"use client";
import { createBooking } from "@/lib/actions/booking.actions";
import React, { useState } from "react";

interface IBookEventProps {
    eventId: string;
    slug: string;
}

const BookEvent = ({ eventId, slug }: IBookEventProps) => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage(null);
        const { success, error } = await createBooking({
            eventId,
            slug,
            email,
        });
        if (success) {
            setSubmitted(true);
        } else {
            setErrorMessage(typeof error === 'string'
                ? error
                : (error instanceof Error ? error.message : JSON.stringify(error, Object.getOwnPropertyNames(error))));
            console.error(["Booking creation failed", error]);
        }
    };
    return (
        <div id="book-event">
            {errorMessage && (
                <p className="text-red-500" data-testid="error-message">{errorMessage}</p>
            )}
            {submitted ? (
                <p className="text-sm" data-testid="success-message">Thank you for signing up!</p>
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
