import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Connection configuration
const MONGODB_URI = process.env.MONGODB_URI;
const MAX_RETRIES = 5;
const RETRY_DELAY = 2000; // 2 seconds

if (!MONGODB_URI) {
    throw new Error('MONGODB_URI not found in environment variables. Please check your configuration.');
}

// Configure mongoose
mongoose.set('strictQuery', false);

// Connection events
mongoose.connection.on('connected', () => {
    console.log('✅ Database Connected Successfully');});

mongoose.connection.on('error', (err) => {
    console.error('❌ Database Connection Error:', err.message);
});

mongoose.connection.on('disconnected', () => {
    console.log('ℹ️  Database Disconnected');
});

// Close connection on process termination
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Database connection closed due to app termination');
    process.exit(0);
});

// Connection function with retry logic
const connectWithRetry = async (retryCount = 0) => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // 5 seconds timeout for server selection
            socketTimeoutMS: 45000, // 45 seconds timeout for socket operations
        });
        return true;
    } catch (error) {
        if (retryCount < MAX_RETRIES) {
            console.warn(`⚠️  Connection attempt ${retryCount + 1} failed. Retrying in ${RETRY_DELAY/1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            return connectWithRetry(retryCount + 1);
        }
        console.error('❌ Failed to connect to MongoDB after multiple attempts:', error.message);
        throw error;
    }
};

const Connection = async () => {
    try {
        await connectWithRetry();
    } catch (error) {
        console.error('❌ Fatal error: Could not connect to MongoDB');
        process.exit(1);
    }
};

export default Connection;