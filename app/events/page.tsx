import EventCard from '@/components/EventCard';
import { IEvent } from '@/db';
import { getEvents } from '@/lib/queries/events';

const EventsPage = async () => {
  const events = await getEvents();

  return (
    <div className="mt-1">
      <h3 className="mb-8">Web events</h3>
      <ul className="events">
        {events.map((event: IEvent) => (
          <li className="list-none" key={event.title}>
            <EventCard {...event} idx={events.indexOf(event)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsPage;
