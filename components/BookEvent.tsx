"use client";
import { createBooking } from "@/lib/actions/booking.actions";
import React, { useState } from "react";

interface IBookEventProps {
    eventId: string;
}

const BookEvent = ({ eventId }: IBookEventProps) => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = await createBooking({
                eventId,
                email,
            });

            if (!result) {
                return;
            }

            if (result.success) {
                setSubmitted(true);
            } else {
                console.error(["Booking creation failed", result.error]);
            }
        } catch (err) {
            console.error("Client action dispatch failed:", err);
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
