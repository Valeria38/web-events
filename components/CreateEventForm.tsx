"use client";
import {
    ActionState,
    ActionStateStatus,
    createEvent,
} from "@/lib/actions/event.actions";
import SubmitButton from "./SubmitButton";
import TagInput from "./TagInput";
import AgendaInput from "./AgendaInput";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { CATEGORIES } from "@/app/constants";
import InputError from "./InputError";

const initialState: ActionState = {
    message: "",
    success: false,
    status: "idle" as ActionStateStatus,
    errors: {},
    inputs: {},
};

const CreateEventForm = () => {
    const [state, formAction] = useActionState(createEvent, initialState);

    const hasError = (fieldName: keyof typeof state.errors) =>
        !!state?.errors?.[fieldName];

    useEffect(() => {
        if (state?.status === "success") {
            toast.success(
                "Event has been successfully created! Redirecting..."
            );

            setTimeout(() => {
                redirect("/events");
            }, 2000);
        }
    }, [state]);

    return (
        <>
            <section>
                <div className="max-w-3xl mx-auto bg-[#0a0a0a] border border-neutral-800 rounded-2xl p-8 shadow-2xl">
                    <h2 className="text-3xl font-bold text-white mb-8">
                        Create <span className="text-[#6EE7B7]">Event</span>
                    </h2>

                    <form action={formAction} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-neutral-400 text-sm">
                                Event Title
                            </label>
                            <input
                                name="title"
                                required
                                defaultValue={
                                    (state?.inputs?.title as string) || ""
                                }
                                placeholder="Enter title"
                                className={`${
                                    hasError("title")
                                        ? "border-red-700 "
                                        : "border-neutral-700"
                                } bg-neutral-900 border border-neutral-700 p-3 rounded-xl text-white outline-none focus:border-[#6EE7B7] transition`}
                            />
                            <InputError isHidden={!hasError("title")}>
                                {state?.errors?.title?.[0]}
                            </InputError>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-neutral-400 text-sm">
                                    Date
                                </label>
                                <input
                                    required
                                    name="date"
                                    type="date"
                                    defaultValue={
                                        (state?.inputs?.date as string) || ""
                                    }
                                    className={`${
                                        hasError("date")
                                            ? "border-red-700 "
                                            : "border-neutral-700"
                                    }bg-neutral-900 border border-neutral-700 p-3 rounded-xl text-white outline-none focus:border-[#6EE7B7] [color-scheme:dark]`}
                                />
                                <InputError isHidden={!hasError("date")}>
                                    {state?.errors?.date?.[0]}
                                </InputError>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-neutral-400 text-sm">
                                    Location
                                </label>
                                <input
                                    required
                                    name="location"
                                    placeholder="Venue or Link"
                                    defaultValue={
                                        (state?.inputs?.location as string) ||
                                        ""
                                    }
                                    className={`bg-neutral-900 border ${
                                        hasError("location")
                                            ? "border-red-700 "
                                            : "border-neutral-700"
                                    } p-3 rounded-xl text-white outline-none focus:border-[#6EE7B7]`}
                                />
                                <InputError isHidden={!hasError("location")}>
                                    {state?.errors?.location?.[0]}
                                </InputError>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-neutral-400 text-sm">
                                Description
                            </label>
                            <textarea
                                required
                                name="description"
                                placeholder="Short summary..."
                                defaultValue={
                                    (state?.inputs?.description as string) || ""
                                }
                                rows={3}
                                className={`bg-neutral-900 border ${
                                    hasError("description")
                                        ? "border-red-700 "
                                        : "border-neutral-700"
                                } p-3 rounded-xl text-white outline-none focus:border-[#6EE7B7] resize-none`}
                            />
                            <InputError isHidden={!hasError("description")}>
                                {state?.errors?.description?.[0]}
                            </InputError>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-neutral-400 text-sm">
                                Full Overview
                            </label>
                            <textarea
                                required
                                name="overview"
                                defaultValue={
                                    (state?.inputs?.overview as string) || ""
                                }
                                placeholder="Detailed information..."
                                rows={5}
                                className={`bg-neutral-900 border ${
                                    hasError("overview")
                                        ? "border-red-700 "
                                        : "border-neutral-700"
                                } p-3 rounded-xl text-white outline-none focus:border-[#6EE7B7] resize-none`}
                            />
                            <InputError isHidden={!hasError("overview")}>
                                {state?.errors?.overview?.[0]}
                            </InputError>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label
                                className="text-neutral-400 text-sm"
                                htmlFor="organizer"
                            >
                                Organizer
                            </label>
                            <input
                                id="organizer"
                                name="organizer"
                                required
                                defaultValue={
                                    (state?.inputs?.organizer as string) || ""
                                }
                                placeholder="e.g. Google Cloud organizes events..."
                                className={`bg-neutral-900 border ${
                                    hasError("organizer")
                                        ? "border-red-700 "
                                        : "border-neutral-700"
                                } p-3 rounded-xl text-white outline-none focus:border-[#6EE7B7]`}
                            />
                            <InputError isHidden={!hasError("organizer")}>
                                {state?.errors?.organizer?.[0]}
                            </InputError>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-neutral-400 text-sm">
                                Cover Image
                            </label>
                            <input
                                required
                                type="file"
                                name="image"
                                accept="image/*"
                                className="text-neutral-400 file:bg-neutral-800 file:text-white file:border-none file:px-4 file:py-2 file:rounded-lg file:mr-4 file:cursor-pointer hover:file:bg-neutral-700"
                            />
                            <InputError isHidden={!hasError("image")}>
                                {state?.errors?.image?.[0]}
                            </InputError>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-neutral-400 text-sm">
                                Venue (Location)
                            </label>
                            <input
                                name="venue"
                                required
                                defaultValue={
                                    (state?.inputs?.venue as string) || ""
                                }
                                placeholder="e.g. Moscone Center"
                                className={`bg-neutral-900 border ${
                                    hasError("venue")
                                        ? "border-red-700 "
                                        : "border-neutral-700"
                                } p-3 rounded-xl text-white outline-none focus:border-[#6EE7B7] transition`}
                            />
                            <InputError isHidden={!hasError("venue")}>
                                {state?.errors?.venue?.[0]}
                            </InputError>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-neutral-400 text-sm">
                                Time
                            </label>
                            <input
                                name="time"
                                required
                                defaultValue={
                                    (state?.inputs?.time as string) || ""
                                }
                                placeholder="8:00"
                                className={`bg-neutral-900 border ${
                                    hasError("time")
                                        ? "border-red-700 "
                                        : "border-neutral-700"
                                } p-3 rounded-xl text-white outline-none focus:border-[#6EE7B7] transition`}
                            />
                            <InputError isHidden={!hasError("time")}>
                                {state?.errors?.time?.[0]}
                            </InputError>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-neutral-400 text-sm">
                                Audience
                            </label>
                            <input
                                name="audience"
                                required
                                defaultValue={
                                    (state?.inputs?.audience as string) || ""
                                }
                                placeholder="Cloud engineers, DevOps"
                                className={`bg-neutral-900 border ${
                                    hasError("audience")
                                        ? "border-red-700 "
                                        : "border-neutral-700"
                                } p-3 rounded-xl text-white outline-none focus:border-[#6EE7B7] transition`}
                            />
                            <InputError isHidden={!hasError("audience")}>
                                {state?.errors?.audience?.[0]}
                            </InputError>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-neutral-400 text-sm">
                                Event Mode
                            </label>
                            <select
                                name="mode"
                                className={`bg-neutral-900 border p-3 rounded-xl outline-none focus:border-[#6EE7B7] appearance-none cursor-pointer ${
                                    hasError("mode")
                                        ? "border-red-700 "
                                        : "border-neutral-700"
                                }`}
                            >
                                {CATEGORIES.map((category) => (
                                    <option key={category} value={category}>
                                        {category.slice(0, 1).toUpperCase() +
                                            category.slice(1)}
                                    </option>
                                ))}
                            </select>
                            <InputError isHidden={!hasError("mode")}>
                                {state?.errors?.mode?.[0]}
                            </InputError>
                        </div>

                        <TagInput error={state?.errors?.tags?.[0]} />
                        <AgendaInput error={state?.errors?.agenda?.[0]} />

                        <SubmitButton />
                    </form>
                </div>
            </section>
        </>
    );
};

export default CreateEventForm;
