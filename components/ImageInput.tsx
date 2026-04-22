"use client";
import { MAX_FILE_SIZE } from "@/lib/validators";
import InputError from "./InputError";
import { useState } from "react";

interface IImageInputProps {
    error?: string;
}

export default function ImageInput({ error }: IImageInputProps) {
    const [sizeError, setSizeError] = useState("");
    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSizeError("");
        const file = e.target.files?.[0];

        if (file && file.size > MAX_FILE_SIZE) {
            setSizeError("Image is too heavy for Vercel (Max 4MB)");
            e.target.value = "";
        }
    };

    return (
        <>
            <label htmlFor="image" className="text-neutral-400 text-sm">
                Cover Image
            </label>
            <input
                onChange={handleCheck}
                id="image"
                required
                type="file"
                name="image"
                accept="image/*"
                className="text-neutral-400 file:bg-neutral-800 file:text-white file:border-none file:px-4 file:py-2 file:rounded-lg file:mr-4 file:cursor-pointer hover:file:bg-neutral-700"
            />
            <InputError isHidden={!error && !sizeError}>
                {error || sizeError}
            </InputError>
        </>
    );
}
