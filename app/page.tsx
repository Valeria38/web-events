import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import events from "@/lib/constants";

// const events = [
//     {
//         imageUrl: "/images/event1.png",
//         title: "Event 1",
//         slug: "event-1",
//         location: "location-1",
//         date: "Date-1",
//         time: "Time-1",
//     },
//     { imageUrl: "/images/event2.png", title: "Event 2" },
// ];

const Page = () => {
    return (
        <section>
            <h1 className="text-center">
                The Hub for Every Dev <br /> Event You Can&apos;t Miss
            </h1>
            <p className="text-center mt-5">
                Hackathons, Meetups, and Conferences, All In One Place.
            </p>
            <ExploreBtn />
            <div className="mt-20 space-y-7">
                <h3>Featured Events</h3>
                <ul className="events">
                    {events.map((ev) => (
                        <li key={ev.title}>
                            <EventCard {...ev} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Page;
