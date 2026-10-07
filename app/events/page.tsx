import EventCard from '@/components/EventCard';
import type { IEvent } from '@/db';
import { getEvents } from '@/lib/queries/events';

const EventsPage = async () => {
  const events = await getEvents();

  return (
    <div className="mt-1">
      <h1 className="mb-8">Web events</h1>
      <ul className="events">
        {events.map((event: IEvent, idx: number) => (
          <li className="list-none" key={event.slug}>
            <EventCard {...event} idx={idx} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsPage;
