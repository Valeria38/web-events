'use server';

import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

import { Event } from '@/db';
import connectDB from '@/lib/mongodb';
import { parseJsonArray } from '@/lib/utils/parse';
import { eventSchema } from '@/lib/validators';

export type ActionStateStatus = 'success' | 'error' | 'idle';
export type Agenda = string[];
export type Tags = string[];

export interface ActionState {
  success: boolean;
  message: string;
  status: ActionStateStatus;
  errors: Record<string, string[]>;
  inputs: Record<string, string | File | Agenda | Tags>;
  timestamp: number | null;
}

export async function createEvent(_: ActionState, formData: FormData): Promise<ActionState> {
  const rawData = {
    ...Object.fromEntries(formData.entries()),
    tags: parseJsonArray<string>(formData.get('tags')),
    agenda: parseJsonArray<string>(formData.get('agenda')),
  };
  const validatedFields = eventSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: validatedFields.error.issues[0]?.message || 'Validation error',
      status: 'error',
      inputs: rawData,
      timestamp: null,
    };
  }
  try {
    await connectDB();
    const file = validatedFields.data.image;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'Web-Events' }, (error, result) => {
          if (error || !result) {
            return reject(error || new Error('Cloudinary upload failed'));
          }
          resolve({ secure_url: result.secure_url });
        })
        .end(buffer);
    });

    await Event.create({
      ...validatedFields.data,
      image: uploadResult.secure_url,
    });

    revalidatePath('/events');
    revalidatePath('/');
    return {
      success: true,
      message: 'Event successfully created',
      status: 'success',
      errors: {},
      inputs: {},
      timestamp: Date.now(),
    };
  } catch (error: unknown) {
    console.error('Event creation:', error);
    const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
    return {
      success: false,
      message: errorMessage,
      status: 'error',
      errors: {},
      inputs: {},
      timestamp: null,
    };
  }
}
