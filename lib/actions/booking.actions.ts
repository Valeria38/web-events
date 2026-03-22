"use server";
import Booking from "@/db/booking.model";
import connectDB from "../mongodb";

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
        const booking = await Booking.create({ eventId, slug, email });
        return { success: true, booking: JSON.parse(JSON.stringify(booking)) };
    } catch (error) {
        console.error("Create booking failed", error);
        return { success: false, error };
    }
}
