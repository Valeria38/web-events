# DevEvent

DevEvent is a Next.js application for discovering and publishing developer events.
Users can browse upcoming events, open event details by slug, create new events with image upload, and book a spot with email.

## Features

- Home page with featured events and quick navigation.
- Events listing page with reusable event cards.
- Event details page with:
  - overview and metadata (date, time, location, mode, audience),
  - agenda and tags,
  - booking form,
  - similar events block.
- Event creation flow with:
  - client-side form UX,
  - server action submission,
  - Zod validation,
  - Cloudinary image upload,
  - cache revalidation after successful creation.
- Loading boundaries for smoother route transitions.

## Tech Stack

- **Framework:** Next.js `16.2.0-canary.101` (App Router)
- **UI:** React `19.2.4`
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + `tw-animate-css`
- **Database:** MongoDB
- **ODM:** Mongoose
- **Validation:** Zod
- **Image Hosting:** Cloudinary
- **Other libs:** `react-hot-toast`, `lucide-react`, `ogl`

## Architecture and Patterns

### Project structure

- `app/` - routes, layout, loading boundaries.
- `components/` - UI and form components.
- `lib/actions/` - server actions (`"use server"`).
- `lib/queries/` - read queries with caching (`"use cache"`).
- `lib/validators/` - Zod schemas.
- `lib/mongodb.ts` - cached DB connection helper.
- `db/` - Mongoose models and exported TypeScript interfaces.
- `public/` - static assets.

### Key approaches

- **Server-first rendering:** route pages are async server components by default.
- **Client components for interactivity only:** forms, inputs, and dynamic UI parts.
- **Separation of reads/writes:**
  - reads in `lib/queries/events.ts`,
  - mutations in `lib/actions/*.ts`.
- **Two-layer validation:**
  - input validation with Zod,
  - persistence constraints with Mongoose schema rules/hooks/indexes.
- **Caching + invalidation:**
  - `use cache` and `cacheLife("minutes")` in queries,
  - `revalidatePath()` after mutations.
- **Static params for dynamic route:** `generateStaticParams()` for `/events/[slug]`.

## Routes

- `/` - home page (`app/page.tsx`)
- `/events` - events listing (`app/events/page.tsx`)
- `/events/[slug]` - event details (`app/events/[slug]/page.tsx`)
- `/create` - create event page (`app/create/page.tsx`)

Additional route boundaries:

- `app/loading.tsx`
- `app/events/[slug]/loading.tsx`

## Data Model

### Event (`db/event.model.ts`)

Core fields:

- `title`, `slug`, `description`, `overview`
- `image`, `venue`, `location`
- `date`, `time`, `mode`, `audience`
- `agenda[]`, `organizer`, `tags[]`
- timestamps

Important rules:

- required validations for key fields,
- `mode` must be one of: `hybrid`, `offline`, `online`,
- non-empty `agenda` and `tags`,
- pre-save normalization:
  - generates slug from title,
  - normalizes date (`YYYY-MM-DD`),
  - normalizes time (`HH:MM`),
- indexes:
  - unique index on `slug`,
  - compound index `{ date: 1, mode: 1 }`.

### Booking (`db/booking.model.ts`)

Core fields:

- `eventId` (ObjectId reference to Event)
- `email`
- timestamps

Important rules:

- email format validation,
- pre-save check that target event exists,
- indexes:
  - `eventId`,
  - `eventId + createdAt`,
  - `email`,
  - unique `eventId + email` (prevents duplicate booking by same email).

## Main Flows

### Create event flow

1. User opens `/create`.
2. `CreateEventForm` collects fields and submits `FormData`.
3. `createEvent` server action validates input via Zod.
4. Image is uploaded to Cloudinary.
5. Event is saved to MongoDB.
6. Paths are revalidated (`/` and `/events`).
7. UI shows feedback and redirects.

### Booking flow

1. User opens `/events/[slug]`.
2. Booking form submits email + event ID.
3. `createBooking` server action writes booking to DB.
4. Schema/index constraints enforce event existence and unique booking per email/event.

## Setup

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create `.env.local` in project root.

Required:

- `MONGODB_URI` - MongoDB connection string

Required for image uploads (Cloudinary):

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Or use a single `CLOUDINARY_URL` if preferred by your Cloudinary setup.

### 3) Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` - start development server
- `npm run build` - create production build
- `npm run start` - run production server
- `npm run lint` - run ESLint