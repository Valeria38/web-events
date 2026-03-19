<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into the DevEvent Next.js App Router project. PostHog is initialized via `instrumentation-client.ts` (the recommended approach for Next.js 15.3+), which sets up client-side analytics, session replay, and error tracking automatically. Two user interaction events are captured across the featured events listing flow. Environment variables are stored in `.env.local` and referenced via `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST`.

| Event | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicks the "Explore Events" button on the home page to scroll to the featured events section | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicks on a featured event card, capturing event title, slug, location, and date | `components/EventCard.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://eu.posthog.com/project/143164/dashboard/577621
- **Explore Events Button Clicks** (trend): https://eu.posthog.com/project/143164/insights/MZOlelFv
- **Event Card Clicks** (trend): https://eu.posthog.com/project/143164/insights/1xSc5tCU
- **Homepage to Event Click Funnel** (conversion funnel): https://eu.posthog.com/project/143164/insights/FSIOPS40
- **Event Card Clicks by Location** (breakdown by event location): https://eu.posthog.com/project/143164/insights/GAAO844e
- **Unique Users Clicking Event Cards** (DAU): https://eu.posthog.com/project/143164/insights/izYanRh7

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
