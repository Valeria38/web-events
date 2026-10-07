import EventCard from '@/components/EventCard';
import ExploreBtn from '@/components/ExploreBtn';
import { getEvents } from '@/lib/queries/events';

const Page = async () => {
  const events = await getEvents();

  return (
    <section>
      <h1 className="text-center main-title">
        The Hub for Every Dev <br /> Event You Can&apos;t Miss
      </h1>
      <p className="text-center mt-5">Hackathons, Meetups, and Conferences, All In One Place.</p>
      <ExploreBtn />
      <div className="mt-20 space-y-7" id="events">
        <h2>Featured Events</h2>
        <ul className="events">
          {events &&
            events.length > 0 &&
            events.map((ev, idx: number) => (
              <li className="list-none" key={ev.title}>
                <EventCard {...ev} idx={idx} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Page;
