import { test, expect } from '@playwright/test';

test.describe('Event details page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");

        // const eventCard = page.locator('.events .event-card').first();
        const eventCard = page.locator('.events .event-card', { hasText: /CI Build Test Event/i }).first();
        await expect(eventCard).toBeVisible({ timeout: 10000 });
        await eventCard.waitFor({ state: 'attached' });

        const href = await eventCard.getAttribute('href');
        await expect(eventCard).toHaveAttribute('href', /^\/events/);

        await eventCard.click();
        await expect(page).toHaveURL(new RegExp(`${href}`));

        const eventSection = page.locator('section#event');
        await expect(eventSection).toBeVisible({ timeout: 20000 });
        await expect(page.locator('h2').first()).toBeVisible({ timeout: 10000 });

        await expect(page).toHaveURL(`${href}`);
    });

    test('should render heading with description text', async ({ page }) => {
        const heading = page.locator('h1', { hasText: /event description/i });
        const descriptionText = page.locator('.header > p');
        await expect(heading).toBeVisible({ timeout: 15000 });
        await expect(descriptionText).toBeVisible();
    })

    test('should render the event image', async ({ page }) => {
        const image = page.locator('.banner');
        await expect(image).toBeVisible();
        await expect(image).toHaveJSProperty('complete', true);
    });

    test('should render the overview section', async ({ page }) => {
        const overviewHeading = page.locator('h2', { hasText: /overview/i });
        const overviewSection = page.locator('#event section', { has: overviewHeading });
        const overviewText = overviewSection.locator('p');
        await expect(overviewHeading).toBeVisible();
        await expect(overviewText).toBeVisible();
    });

    test('should render event details section', async ({ page }) => {
        const detailsHeading = page.locator('h2', { hasText: /event details/i });
        const detailsSection = page.locator('#event section', { has: detailsHeading });
        const location = detailsSection.getByTestId('location');

        await expect(detailsSection).toHaveText(/\d{4}-\d{2}-\d{2}/);
        await expect(detailsSection).toHaveText(/\d{2}:\d{2}/);
        await expect(detailsSection).toHaveText(/(hybrid|remote|offline)/i);
        await expect(location).not.toBeEmpty();
    });

    test('should render agenda section', async ({ page }) => {
        const agendaSection = page.locator('.agenda');
        const agendaHeading = agendaSection.locator('h2', { hasText: /agenda/i });
        const agendaItems = agendaSection.locator('li');

        await expect(agendaHeading).toBeVisible();
        expect(await agendaItems.count()).toBeGreaterThan(0);
    });

    test('should render the about section', async ({ page }) => {
        const aboutHeading = page.locator('h2', { hasText: /about the organizer/i });
        const aboutSection = page.locator('#event section', { has: aboutHeading });

        await expect(aboutSection).toBeVisible();
        await expect(aboutHeading).toBeVisible();
    });

    test('should render tags', async ({ page }) => {
        const tag = page.locator('.pill').first();

        await expect(tag).toBeVisible();
    })

    test('should book the spot', async ({ page }, testInfo) => {
        const bookSection = page.locator('.booking', { hasText: /book your spot/i });
        const bookButton = bookSection.getByRole('button', { name: /submit/i });
        const bookForm = bookSection.locator('form');
        await expect(bookForm).toBeVisible();
        const emailInput = bookForm.locator('input#email');
        // const successMessage = page.getByText(/thank you for signing up!/i);
        const successMessage = page.getByTestId('success-message');


        await expect(bookForm).toBeVisible();
        await expect(successMessage).not.toBeVisible({ timeout: 10000 });

        const email = Date.now() + testInfo.workerIndex + '@mail.com';
        await emailInput.fill(email);
        await expect(bookButton).toBeEnabled();

        await bookButton.click();

        await expect(successMessage).toBeVisible({ timeout: 15000 });
        await expect(successMessage).toHaveText('Thank you for signing up!');
        await expect(bookForm).toBeHidden({ timeout: 10000 });
    });
});


