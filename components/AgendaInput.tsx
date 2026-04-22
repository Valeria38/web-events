"use client";

import { useState } from "react";
import { Plus, Trash2, CalendarDays } from "lucide-react";
import InputError from "./InputError";

export default function AgendaInput({ error }: { error?: string }) {
    const [items, setItems] = useState<string[]>([]);
    const [currentValue, setCurrentValue] = useState("");

    const addItem = () => {
        if (currentValue.trim()) {
            setItems([...items, currentValue.trim()]);
            setCurrentValue("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addItem();
        }
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-col gap-3">
            <label
                htmlFor="agenda"
                className="text-neutral-400 text-sm font-medium flex items-center gap-2"
            >
                <CalendarDays size={18} className="text-[#6EE7B7]" />
                Event Agenda
            </label>

            <div className="flex flex-col gap-2">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 bg-neutral-900/50 border border-neutral-800 p-3 rounded-xl group hover:border-neutral-700 transition-all"
                    >
                        <span className="text-neutral-500 text-xs font-mono">
                            0{index + 1}
                        </span>
                        <span className="text-neutral-200 text-sm flex-1">
                            {item}
                        </span>
                        <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="text-neutral-600 hover:text-red-400 transition-colors"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex gap-2">
                <input
                    id="agenda"
                    type="text"
                    value={currentValue}
                    onChange={(e) => setCurrentValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g. 10:00 AM | Networking"
                    className={`flex-1 bg-neutral-900 border border-neutral-700 p-3 rounded-xl text-white outline-none focus:border-[#6EE7B7] focus:ring-1 focus:ring-[#6EE7B7] transition-all placeholder:text-neutral-600 ${
                        !!error ? "border-red-700 " : "border-neutral-700"
                    }`}
                />
                <button
                    type="button"
                    onClick={addItem}
                    className="bg-[#6EE7B7]/10 border border-[#6EE7B7]/20 p-3 rounded-xl text-[#6EE7B7] hover:bg-[#6EE7B7]/20 transition-all active:scale-95"
                >
                    <Plus size={24} />
                </button>
            </div>

            <input type="hidden" name="agenda" value={JSON.stringify(items)} />

            <InputError isHidden={!error}>{error}</InputError>

            {items.length === 0 && (
                <p className="text-neutral-600 text-xs italic">
                    No agenda items added yet.
                </p>
            )}
        </div>
    );
}
