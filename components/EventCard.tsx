"use client";

import Image from "next/image";
import Link from "next/link";

interface Props {
    title: string;
    image: string;
    slug: string;
    location: string;
    date: string;
    time: string;
    idx: number;
}

const EventCard = ({
    title,
    image,
    slug,
    location,
    date,
    time,
    idx,
}: Props) => {
    return (
        <Link href={`/events/${slug}`} id="event-card">
            <div>
                <Image
                    src={image}
                    alt="Event image"
                    width={410}
                    height={300}
                    className="poster"
                    priority={idx <= 3}
                    sizes="(max-width: 639px) 100vw, (max-width: 767px) 50vw, 33.3vw"
                />
                <div className="flex flex-row gap-2">
                    <Image
                        src="/icons/pin.svg"
                        alt="location"
                        width={14}
                        height={14}
                    />
                    <p>{location}</p>
                    <div className="datetime">
                        <div>
                            <Image
                                src="/icons/calendar.svg"
                                alt="location"
                                width={14}
                                height={14}
                            />
                            <p>{date}</p>
                        </div>
                        <div>
                            <Image
                                src="/icons/clock.svg"
                                alt="location"
                                width={14}
                                height={14}
                            />
                            <p>{time}</p>
                        </div>
                    </div>
                </div>
                <p className="title">{title}</p>
            </div>
        </Link>
    );
};

export default EventCard;
