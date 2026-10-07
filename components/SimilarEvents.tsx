import { IEvent } from '@/db';
import { getSimilarEventsBySlug } from '@/lib/queries/events';

import EventCard from './EventCard';

interface ISimilarEventsProps {
  slug: string;
}

const SimilarEvents = async ({ slug }: ISimilarEventsProps) => {
  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

  return (
    <div className="flex w-full flex-col gap-4 pt-20">
      <h2>Similar events</h2>
      <div className="events">
        {similarEvents.length
          ? similarEvents.map((event: IEvent) => (
              <EventCard
                idx={Number(event._id)}
                key={event.title}
                title={event.title}
                image={event.image}
                slug={event.slug}
                location={event.location}
                date={event.date}
                time={event.time}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default SimilarEvents;
