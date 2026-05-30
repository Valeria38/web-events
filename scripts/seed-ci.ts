import mongoose from 'mongoose';

async function seed() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error('Seed called without MONGODB_URI environment variable set');
        process.exit(1);
    }

    await mongoose.connect(uri);

    await mongoose.connection.collection('events').insertOne({
        title: 'CI Build Test Event',
        slug: 'ci-build-test-event',
        description: 'Test event created during CI build to ensure that the database is not empty and static params can be generated successfully.',
        overview: 'Test overview for CI build event.',
        image: 'Test image URL',
        venue: 'Test Venue',
        location: 'Test Location',
        date: new Date().toISOString().split('T')[0],
        time: '12:00',
        mode: 'hybrid',
        audience: 'developers',
        agenda: ['item 1'],
        organizer: 'Test Organizer',
        tags: ['tag 1', 'tag 2'],
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    console.log('Test event successfully inserted into the database for CI build');
    await mongoose.connection.close();
}

seed().catch(console.error);