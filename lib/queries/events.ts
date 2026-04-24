import { Event } from "@/db";
import connectDB from "../mongodb";
import { cacheLife } from "next/cache";

export const getSimilarEventsBySlug = async (slug: string) => {
    "use cache";
    cacheLife("minutes");
    try {
        await connectDB();
        const event = await Event.findOne({ slug });
        const similar = await Event.find({
            _id: { $ne: event._id },
            tags: { $in: event.tags },
        }).lean();
        return JSON.parse(JSON.stringify(similar));
    } catch (error) {
        return [];
    }
};

export const getEvents = async () => {
    "use cache";
    cacheLife("minutes");
    try {
        await connectDB();
        const events = await Event.find().sort({ createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(events));
    } catch (error) {
        return [];
    }
};

export const getEventDetails = async (slug: string) => {
    "use cache";
    cacheLife("minutes");
    try {
        await connectDB();
        // const { slug } = await params;

        if (!slug || typeof slug !== "string" || slug.trim() === "") {
            return null;
        }
        const sanitizedSlug = slug.trim().toLowerCase();

        const event: Event | null = await Event.findOne({
            slug: sanitizedSlug,
        }).lean();

        if (!event) {
            return null;
        }
        return JSON.parse(JSON.stringify(event));
    } catch (err) {
        console.error("Error fetching event by slug: ", err);
        throw new Error("Internal Server Error");
    }
};
