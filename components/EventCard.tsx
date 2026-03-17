import Image from "next/image";
import Link from "next/link";

interface Props {
    title: string;
    imageUrl: string;
    slug: string;
    location: string;
    date: string;
    time: string;
}

const EventCard = ({ title, imageUrl, slug, location, date, time }: Props) => {
    return (
        <Link href={"/events"} id="event-card">
            <Image
                src={imageUrl}
                alt="Event image"
                width={410}
                height={300}
                className="poster"
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
        </Link>
    );
};

export default EventCard;
