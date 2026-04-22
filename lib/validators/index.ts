import { CATEGORIES } from "@/app/constants";
import * as z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/avif",
];

export const eventSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(50, "Title cannot exceed 50 characters"),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters")
        .max(1000, "Description cannot exceed 1000 characters"),
    overview: z
        .string()
        .min(10, "Overview must be at least 10 characters")
        .max(500, "Overview cannot exceed 500 characters"),
    image: z
        .any()
        .refine((file) => file?.size > 0, "Image is required")
        .refine((file) => file?.size <= MAX_FILE_SIZE, `Maximum size is 5MB`)
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            "Only formats .jpg, .jpeg, .png .webp, .avif are allowed"
        ),
    venue: z
        .string()
        .min(3, "Venue must be at least 3 characters")
        .max(20, "Venue canot exceed 20 characters"),
    location: z
        .string()
        .min(3, "Location is required")
        .max(30, "Venue canot exceed 30 characters"),
    date: z.string().min(1, "Date is required"),
    time: z.string().min(1, "Time is required"),
    audience: z
        .string()
        .min(3, "Audience must be at least 3 characters")
        .max(40, "Audience canot exceed 40 characters"),
    agenda: z
        .array(z.string())
        .nonempty("At least one agenda item is required"),
    organizer: z
        .string()
        .min(1, "Organizer is required")
        .max(20, "Organizer canot exceed 20 characters"),
    tags: z.array(z.string()).nonempty("At least one tag is required"),
    mode: z.string().refine((val) => CATEGORIES.includes(val), {
        message: "Invalid category",
    }),
});
