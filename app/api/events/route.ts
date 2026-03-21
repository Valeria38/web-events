import { Event } from "@/db";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export async function GET() {
    try {
        await connectDB();
        const events = await Event.find().sort({ createdAt: -1 });
        return NextResponse.json(
            {
                message: "Events fetched successfully",
                events,
            },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { message: "Event fetching failed", error: err },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const formData = await req.formData();
        let event;
        try {
            event = Object.fromEntries(formData);
        } catch (e) {
            return NextResponse.json(
                { message: "Invalid JSON data format" },
                { status: 400 }
            );
        }
        const file = formData.get("image") as File;
        if (!file) {
            return NextResponse.json(
                { message: "Image file is required" },
                { status: 400 }
            );
        }
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        resource_type: "image",
                        folder: "Web-Events",
                    },
                    (error, results) => {
                        if (error) {
                            return reject(error);
                        }
                        resolve(results);
                    }
                )
                .end(buffer);
        });
        event.image = (uploadResult as { secure_url: string }).secure_url;
        const createdEvent = await Event.create(event);
        return NextResponse.json(
            {
                message: "Event created successfully",
                event: createdEvent,
            },
            { status: 201 }
        );
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            {
                message: "Event creation failed",
                error: err instanceof Error ? err.message : "Unknown",
            },
            { status: 500 }
        );
    }
}
