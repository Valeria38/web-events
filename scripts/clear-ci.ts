import mongoose from 'mongoose';

async function clear() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error('Error: MONGODB_URI is not set in environment variables.');
        process.exit(1);
    }

    await mongoose.connect(uri, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
    })

    const result = await mongoose.connection.collection('events').deleteOne({
        slug: 'ci-build-test-event'
    });

    if (result.deletedCount && result.deletedCount > 0) {
        console.log('--- [CI CLEAR]: temporary event successfully deleted from DB ---');
    } else {
        console.log('--- [CI CLEAR]: temporary event not found ---');
    }

    await mongoose.connection.close();
}

clear().catch((err) => {
    console.error('Error occurred while clearing the database in CI:', err);
    process.exit(1);
});
