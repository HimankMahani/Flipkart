import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const Connection = async () => {
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
        console.warn('MONGODB_URI not found in environment variables. Please check your .env file.');
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI, { 
            useUnifiedTopology: true, 
            useNewUrlParser: true, 
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Database Connected Successfully');
    } catch(error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};

export default Connection;