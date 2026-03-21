import { notFound } from "next/navigation";

const EventDetails = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${slug}`
    );
    const { event } = await response.json();

    if (!event) {
        return notFound();
    }

    return (
        <section id="event">
            <h1>
                Event details: <br />
                {slug}
            </h1>
        </section>
    );
};

export default EventDetails;
