"use server";

import { Event } from "@/db";
import connectDB from "../mongodb";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import { eventSchema } from "../validators";

export const getSimilarEventsBySlug = async (slug: string) => {
    try {
        await connectDB();
        const event = await Event.findOne({ slug });
        return await Event.find({
            _id: { $ne: event._id },
            tags: { $in: event.tags },
        }).lean();
    } catch (error) {
        return [];
    }
};

export const getEvents = async () => {
    try {
        await headers();
        await connectDB();
        const events = await Event.find().sort({ createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(events));
    } catch (error) {
        return [];
    }
};

export type ActionStateStatus = "success" | "error" | "idle";

export interface ActionState {
    success: boolean;
    message: string;
    status: ActionStateStatus;
    errors: Record<string, string[]>;
    inputs: Record<string, string | File>;
    timestamp: number | null;
}

export async function createEvent(state: ActionState, formData: FormData) {
    const image = formData.get("image") as File;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;
    const location = formData.get("location") as string;
    const overview = formData.get("overview") as string;
    const tags = JSON.parse(formData.get("tags") as string);
    const agenda = JSON.parse(formData.get("agenda") as string);
    const venue = formData.get("venue") as string;
    const time = formData.get("time") as string;
    const mode = formData.get("mode") as string;
    const audience = formData.get("audience") as string;
    const organizer = formData.get("organizer") as string;

    const rawData = {
        title,
        description,
        date,
        location,
        overview,
        tags,
        agenda,
        venue,
        time,
        mode,
        audience,
        organizer,
        image,
    };
    const validatedFields = eventSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message:
                validatedFields.error.issues[0]?.message || "Validation error",
            status: "error",
            inputs: rawData,
            timestamp: null,
        } as ActionState;
    }
    try {
        await connectDB();
        const file = formData.get("image") as File;
        if (!file || file.size === 0) throw new Error("File not found");
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResult = await new Promise<{ secure_url: string }>(
            (resolve, reject) => {
                cloudinary.uploader
                    .upload_stream(
                        { folder: "Web-Events" },
                        (error, result) => {
                            if (error || !result) {
                                return reject(
                                    error ||
                                        new Error("Cloudinary upload failed")
                                );
                            }
                            resolve({ secure_url: result.secure_url });
                        }
                    )
                    .end(buffer);
            }
        );

        await Event.create({
            ...rawData,
            image: uploadResult.secure_url,
        });

        revalidatePath("/events");
        return {
            success: true,
            message: "Event successfully created",
            status: "success",
            errors: {},
            inputs: {},
            timestamp: Date.now(),
        } as ActionState;
    } catch (error: unknown) {
        console.error("Event creation:", error);
        const errorMessage =
            error instanceof Error ? error.message : "Something went wrong";
        return {
            success: false,
            message: errorMessage,
            status: "error",
            errors: {},
            inputs: {},
        } as ActionState;
    }
}
