import Page from '@/app/page';
import { test, expect } from '@playwright/test';

test.describe('Event details page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        const eventCard = page.locator('#event-card').first();
        const href = await eventCard.getAttribute('href');
        await eventCard.click();
        await expect(page).toHaveURL(new RegExp(`${href}`));
    });


    test('should render heading with description text', async ({ page }) => {
        const heading = page.locator('h1', { hasText: /event description/i });
        const descriptionText = page.locator('.header > p');
        await expect(heading).toBeVisible();
        await expect(descriptionText).toBeVisible();
    })

    test('should render the event image', async ({ page }) => {
        const image = page.locator('.banner');
        await expect(image).toBeVisible();
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

    test('should book the spot', async ({ page }) => {
        const bookSection = page.locator('.booking', { hasText: /book your spot/i });
        const bookButton = bookSection.getByRole('button', { name: /submit/i });
        const bookForm = bookSection.locator('form');
        const emailInput = bookForm.locator('input#email');
        const successMessage = page.locator('#book-event').getByText('Thank you for signing up!');
        const responsePromise = page.waitForResponse(response =>
            response.url().includes('/events/') &&
            response.request().method() === 'POST'
        );

        await expect(bookForm).toBeVisible();
        await expect(successMessage).not.toBeVisible();


        const email = Date.now() + '@mail.com';
        await emailInput.fill(email);
        await bookButton.click();
        const response = await responsePromise;
        const requestData = response.request().postDataJSON();
        const payload = Array.isArray(requestData) ? requestData[0] : requestData;
        expect(response.status()).toBe(200);
        expect(payload?.email).toBe(email);

        await expect(successMessage).toBeVisible();
        await expect(bookForm).toBeHidden();
    });
});


