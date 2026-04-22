"use client";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-[#6EE7B7] hover:bg-[#59c99e] text-black font-bold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-lg shadow-[#6ee7b720]"
        >
            {pending ? "Pending..." : "Create event"}
        </button>
    );
};

export default SubmitButton;
