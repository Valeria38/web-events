"use client";

import { useState, KeyboardEvent, FocusEvent } from "react";
import { X } from "lucide-react";
import InputError from "./InputError";

export default function TagInput({ error }: { error?: string }) {
    const [tags, setTags] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        const value = inputValue.trim();
        if (e.key === "Enter" && value) {
            e.preventDefault();
            if (!tags.includes(value)) {
                setTags([...tags, value]);
            }
            setInputValue("");
        }
    };
    const handleBlur = (e: FocusEvent) => {
        const value = inputValue.trim();

        e.preventDefault();
        if (!tags.includes(value)) {
            setTags([...tags, value]);
        }
        setInputValue("");
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="tags" className="text-neutral-400 text-sm">
                Tags (Press Enter or blur(for mobile devices) to add)
            </label>

            <div
                className={`flex flex-wrap gap-2 p-2 bg-neutral-900 border border-neutral-700 rounded-xl min-h-[50px] focus-within:border-[#6EE7B7] transition ${
                    !!error ? "border-red-700 " : "border-neutral-700"
                }`}
            >
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="flex items-center gap-1 bg-neutral-800 text-[#6EE7B7] px-3 py-1 rounded-full text-sm border border-[#6EE7B7]/30"
                    >
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)}>
                            <X
                                size={14}
                                className="hover:text-white transition"
                            />
                        </button>
                    </span>
                ))}

                <input
                    id="tags"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    placeholder={
                        tags.length === 0 ? "e.g. React, Web3, Design" : ""
                    }
                    className={` bg-transparent outline-none text-white flex-1 min-w-[120px] p-1 `}
                />
            </div>
            <InputError isHidden={!error}>{error}</InputError>
            <input type="hidden" name="tags" value={JSON.stringify(tags)} />
        </div>
    );
}
