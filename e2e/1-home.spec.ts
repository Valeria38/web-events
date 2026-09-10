import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test('should have correct title', async ({ page }) => {
    await expect(page).toHaveTitle('DevEvent');
  });

  test('should display the main heading', async ({ page }) => {
    const heading = page.locator('h1', {
      hasText: "The Hub for Every Dev Event You Can't Miss"
    });
    await expect(heading).toBeVisible();
  });

  test('should have "explore events" link', async ({ page }) => {
    const exploreLink = page.getByRole('link', {
      name: /explore events/i
    });
    await expect(exploreLink).toBeVisible();
  });

  test('should scroll to the events section when "explore events" link is clicked', async ({ page }) => {
    const exploreLink = page.getByRole('link', {
      name: /explore events/i
    });
    await exploreLink.click();
    const eventsSection = page.locator('.events');
    await expect(eventsSection).toBeInViewport();
  });

  test('should navigate to the event details page when an event card is clicked', async ({ page }) => {
    const eventCard = page.locator('.event-card').first();
    const href = await eventCard.getAttribute('href');
    await eventCard.click();
    await expect(page).toHaveURL(new RegExp(`${href}`));
  })
});



