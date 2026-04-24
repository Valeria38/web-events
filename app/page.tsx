import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/db";
import { getEvents } from "@/lib/queries/events";

const Page = async () => {
    const events = await getEvents();

    return (
        <section>
            <h1 className="text-center">
                The Hub for Every Dev <br /> Event You Can&apos;t Miss
            </h1>
            <p className="text-center mt-5">
                Hackathons, Meetups, and Conferences, All In One Place.
            </p>
            <ExploreBtn />
            <div className="mt-20 space-y-7" id="events">
                <h3>Featured Events</h3>
                <ul className="events">
                    {events &&
                        events.length > 0 &&
                        events.map((ev: IEvent) => (
                            <li className="list-none" key={ev.title}>
                                <EventCard {...ev} />
                            </li>
                        ))}
                </ul>
            </div>
        </section>
    );
};

export default Page;
