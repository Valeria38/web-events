"use client";
import { MAX_FILE_SIZE } from "@/lib/validators";
import InputError from "./InputError";

interface IImageInputProps {
    error?: string;
}

export default function ImageInput({ error }: IImageInputProps) {
    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log("FILES", file, file?.size, MAX_FILE_SIZE);
        if (file && file.size > MAX_FILE_SIZE) {
            alert("Image is too heavy for Vercel (Max 4MB)");
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
            <InputError isHidden={!error}>{error}</InputError>
        </>
    );
}
