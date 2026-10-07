'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

import { createBooking } from '@/lib/actions/booking.actions';

interface IBookEventProps {
  eventId: string;
}

const BookEvent = ({ eventId }: IBookEventProps) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await createBooking({
        eventId,
        email,
      });

      if (result?.success) {
        setSubmitted(true);
      } else {
        console.error(['Booking creation failed', result.error]);
        const message = 'Something went wrong. Please try again later.';
        toast.error(message);
      }
    } catch (err) {
      console.error('Client action dispatch failed:', err);
      const message = 'Something went wrong. Please try again later.';
      console.log('before toast');
      toast.error(message);
    }
  };
  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-sm">Thank you for signing up!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Enter your email address"
            />
          </div>
          <button type="submit" className="button-submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
