import { test, expect, type Page } from '@playwright/test';
import mongoose from 'mongoose';

interface ITestField {
    selector: string;
    value: string;
    type: 'text' | 'file';
}

const requiredFields: ITestField[] = [
    { selector: 'input#title', type: 'text', value: 'TestEvent 2026' },
    { selector: 'input#date', type: 'text', value: '2026-05-30' },
    { selector: 'input#location', type: 'text', value: 'Kyiv, Ukraine' },
    { selector: 'textarea#description', type: 'text', value: 'Description' },
    { selector: 'textarea#overview', type: 'text', value: 'Test Overview' },
    { selector: 'input#organizer', type: 'text', value: 'Test Organizer' },
    { selector: 'input#venue', type: 'text', value: 'Venue' },
    { selector: 'input#image', type: 'file', value: 'e2e/fixtures/web-summit.jpg' },
    { selector: 'input#time', type: 'text', value: '09:00' },
    { selector: 'input#audience', type: 'text', value: 'Audience' }
];

const fillAllReqFieldsWithValidData = async (page: Page, fields: ITestField[]) => {
    for (const { selector, value, type } of fields) {
        if (type === 'file') {
            await page.setInputFiles(selector, value);
        } else {
            await page.fill(selector, value);
        }
    }
}

const createEventTestTitle = 'should create an event successfully and redirect to /events page';
test.describe('Create event page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/create");
    });

    test.afterEach(async ({ }, testInfo) => {
        if (testInfo.title === createEventTestTitle) {
            if (mongoose.connection.readyState === 0) {
                await mongoose.connect(process.env.MONGODB_URI!);
            }

            try {
                await mongoose.connection.collection('events').deleteMany({
                    title: 'TestEvent 2026'
                });
                console.log('Test event successfully deleted after test run');
            } catch (error) {
                console.error('Error occurred while deleting test event:', error);
            } finally {
                await mongoose.connection.close();
            }
        }
    });

    test('should render create event form', async ({ page }) => {
        const heading = page.locator('h2', { hasText: /create event/i });
        const formContainer = page.locator('div', { has: heading });
        const form = formContainer.locator('form');

        await expect(heading).toBeVisible();
        await expect(form).toBeVisible();
    });

    test('should validate required fields on the client side', async ({ page }) => {
        const form = page.locator('form');
        const submitButton = form.getByRole('button', { name: /create event/i });

        await fillAllReqFieldsWithValidData(page, requiredFields);

        for (const { selector, value, type } of requiredFields) {
            const input = page.locator(selector);

            if (type === 'file') {
                await input.setInputFiles([]);
            } else {
                await input.clear();
            }

            await submitButton.click();

            await expect(input).toBeFocused();

            const isValid = await input.evaluate((el: HTMLInputElement) => el.validity.valid);
            expect(isValid).toBeFalsy();

            if (type === 'file') {
                await input.setInputFiles(value);
            } else {
                await input.fill(value);

            }
        }

    });

    test('should block submission if any required field is empty', async ({ page }) => {
        const form = page.locator('form');
        const submitButton = form.getByRole('button', { name: /create event/i });

        await submitButton.click();
        const isFormValid = await page.locator('form').evaluate((form: HTMLFormElement) => form.checkValidity());

        expect(isFormValid).toBeFalsy();
    });

    test('should show server-side validation errors for tags and agenda', async ({ page }) => {
        const submitButton = page.getByRole('button', { name: /create event/i });
        const responsePromise = page.waitForResponse(response =>
            response.url().includes('/create') && response.request().method() === 'POST'
        );

        await fillAllReqFieldsWithValidData(page, requiredFields);
        await submitButton.click();
        const response = await responsePromise;
        expect(response.status()).toBe(200);
        const tagError = page.getByText('At least one tag is required');
        const agendaError = page.getByText('At least one agenda item is required');

        await expect(tagError).toBeVisible();
        await expect(agendaError).toBeVisible();
        await expect(tagError).toHaveClass(/text-red-700/);
        await expect(agendaError).toHaveClass(/text-red-700/);
    });

    test(createEventTestTitle, async ({ page }) => {
        const submitButton = page.getByRole('button', { name: /create event/i });
        const responsePromise = page.waitForResponse(response =>
            response.url().includes('/create') && response.request().method() === 'POST'
        );
        await fillAllReqFieldsWithValidData(page, requiredFields);
        await page.fill('input#tags', 'tag1');
        await page.keyboard.press('Enter');
        await page.fill('input#tags', 'tag2');
        await page.keyboard.press('Enter');
        await page.fill('input#agenda', "Agenda item 1");
        await page.keyboard.press('Enter');
        await page.fill('input#agenda', "Agenda item 2");
        await page.keyboard.press('Enter');
        await submitButton.click();
        const response = await responsePromise;

        expect(response.status()).toBe(200);
        const successToast = page.locator('div[role=status]', { hasText: "Event has been successfully created! Redirecting..." })
        await expect(successToast).toBeVisible({});
        await expect(page).toHaveURL(/\/events/);
        const newEventCard = page.locator('#event-card', { hasText: 'TestEvent 2026' });
        await expect(newEventCard).toBeVisible();
    });
});