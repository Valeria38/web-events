import BookEvent from "@/components/BookEvent";
import Image from "next/image";
import { notFound } from "next/navigation";

const EventDetailItem = ({
    icon,
    alt,
    label,
}: {
    icon: string;
    alt: string;
    label: string;
}) => (
    <div className="flex flex-row gap-2 items-center">
        <Image src={icon} alt={alt} width={17} height={17} />
        <p>{label}</p>
    </div>
);

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
    <div className="agenda">
        <h2>Agenda</h2>
        <ul>
            {agendaItems.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    </div>
);

const EventTags = ({ tags }: { tags: string[] }) => (
    <div className="flex flex-row gap-1.5 flex-wrap">
        {tags.map((tag) => (
            <div className="pill" key={tag}>
                {tag}
            </div>
        ))}
    </div>
);
const EventDetails = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const bookings = 11;
    let event;
    const { slug } = await params;
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${slug}`,
            {
                next: { revalidate: 60 },
            }
        );
        if (!response.ok) {
            if (response.status === 404) {
                return notFound();
            }
            throw new Error(`Failed to fetch event: ${response.statusText}`);
        }
        const res = await response.json();
        event = res.event;
        if (!event) {
            return notFound();
        }
    } catch (error) {
        console.error("Error fetching event", error);
        return notFound();
    }

    const {
        description,
        date,
        time,
        agenda,
        location,
        mode,
        audience,
        overview,
        image,
        organizer,
        tags,
    } = event;

    return (
        <section id="event">
            <div className="header">
                <h1>Event Description</h1>
                <p>{description}</p>
            </div>
            <div className="details">
                {/* event content */}
                <div className="content">
                    <Image
                        src={image}
                        alt="Event Banner"
                        width={800}
                        height={800}
                        className="banner"
                    ></Image>
                    <section className="flex flex-col gap-2">
                        <h2>Overview</h2>
                        <p>{overview}</p>
                    </section>
                    <section className="flex flex-col gap-2">
                        <h2>Event Details</h2>
                        <EventDetailItem
                            icon={"/icons/calendar.svg"}
                            alt="calendar"
                            label={date}
                        />
                        <EventDetailItem
                            icon={"/icons/clock.svg"}
                            alt="time"
                            label={time}
                        />
                        <EventDetailItem
                            icon={"/icons/pin.svg"}
                            alt="clock"
                            label={location}
                        />
                        <EventDetailItem
                            icon={"/icons/mode.svg"}
                            alt="mode"
                            label={mode}
                        />
                        <EventDetailItem
                            icon={"/icons/audience.svg"}
                            alt="audience"
                            label={audience}
                        />
                    </section>
                    <EventAgenda agendaItems={JSON.parse(agenda[0])} />
                    <section className="flex-col-gap-2">
                        <h2>About the organizer</h2>
                        <p>{organizer}</p>
                    </section>
                    <EventTags tags={JSON.parse(tags[0])} />
                </div>
                {/* booking form*/}
                <aside className="booking">
                    <div className="signup-card">
                        <h2>Book your spot</h2>
                        {bookings > 10 ? (
                            <p className="text-sm">
                                Join {bookings} people who have already booked
                                their spot!
                            </p>
                        ) : (
                            <p className="text-sm">
                                Be the first to book your spot!
                            </p>
                        )}
                        <BookEvent />
                    </div>
                </aside>
            </div>
        </section>
    );
};

export default EventDetails;
