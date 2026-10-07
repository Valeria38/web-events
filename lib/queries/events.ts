import { cacheLife } from 'next/cache';

import { Event, type IEvent } from '@/db';

import connectDB from '../mongodb';

export const getSimilarEventsBySlug = async (slug: string): Promise<IEvent[]> => {
  'use cache';
  cacheLife('minutes');
  try {
    await connectDB();
    const event = await Event.findOne({ slug }).lean<IEvent>();
    if (!event) return [];
    const similar = await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    }).lean<IEvent[]>();
    return JSON.parse(JSON.stringify(similar));
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getEvents = async (): Promise<IEvent[]> => {
  'use cache';
  cacheLife('minutes');
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 }).lean<IEvent[]>();
    return JSON.parse(JSON.stringify(events));
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getEventDetails = async (slug: string): Promise<IEvent | null> => {
  'use cache';
  cacheLife('minutes');
  try {
    await connectDB();

    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      return null;
    }
    const sanitizedSlug = slug.trim().toLowerCase();

    const event = await Event.findOne({
      slug: sanitizedSlug,
    }).lean<IEvent>();

    if (!event) {
      return null;
    }
    return JSON.parse(JSON.stringify(event));
  } catch (err) {
    console.error('Error fetching event by slug: ', err);
    throw new Error('Internal Server Error');
  }
};
