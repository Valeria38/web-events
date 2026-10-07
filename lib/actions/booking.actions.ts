'use server';
import Booking from '@/db/booking.model';

import connectDB from '../mongodb';

interface IBookingActionResponse {
  success: boolean;
  error?: string;
}

export async function createBooking(params: {
  eventId: string;
  email: string;
}): Promise<IBookingActionResponse> {
  try {
    await connectDB();

    await Booking.create({
      eventId: params.eventId,
      email: params.email,
    });

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
