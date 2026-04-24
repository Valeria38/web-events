import { Event } from "@/db";
import connectDB from "../mongodb";
import { headers } from "next/headers";

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
