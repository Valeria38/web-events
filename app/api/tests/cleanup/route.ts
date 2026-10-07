import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import connectDB from '@/lib/mongodb';

export async function POST() {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isTestMode = process.env.NEXT_PUBLIC_APP_ENV === 'test';

  if (!isDevelopment && !isTestMode) {
    console.log('not allowed in production');
    return NextResponse.json({ error: 'Not Allowed in production' }, { status: 403 });
  }

  try {
    if (mongoose.connection.readyState === 0) {
      await connectDB();
    }

    const result = await mongoose.connection.collection('events').deleteMany({
      title: 'TestEvent 2026',
    });

    revalidatePath('/');

    return NextResponse.json({
      success: true,
      message: `Test data cleaned up successfully. Deleted ${result.deletedCount} document(s).`,
    });
  } catch (error) {
    console.error('Error inside cleanup API:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
