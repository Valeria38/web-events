"use server";
import Booking from "@/db/booking.model";
import connectDB from "../mongodb";
import { Event } from "@/db";


export async function createBooking({
    eventId,
    slug,
    email,
}: {
    eventId: string;
    slug: string;
    email: string;
}) {
    try {
        await connectDB();
        const eventExists = await Event.findById(eventId);
        if (!eventExists) {
            return { success: false, error: "Event does not exist" };
        }
        const booking = await Booking.create({ eventId, slug, email });
        return { success: true, booking: JSON.parse(JSON.stringify(booking)) };
    } catch (error) {
        console.error("Create booking failed", error);
        if (process.env.CI) {
            console.log("======================================");
            console.log("CRITICAL MONGODB ERROR IN CI:");
            console.log(error instanceof Error ? error.stack : error);
            console.log("======================================");
            // process.exit(1);
        }
        return { success: false, error };
    }
}
