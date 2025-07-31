import Product from './model/productSchema.js';
import { products } from './constants/product.js';
import mongoose from 'mongoose';

const waitForConnection = async (maxAttempts = 10, delay = 2000) => {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        if (mongoose.connection.readyState === 1) {
            return true;
        }
        console.log(`Waiting for database connection... (Attempt ${attempt}/${maxAttempts})`);
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    throw new Error('Could not establish database connection after multiple attempts');
};

const DefaultData = async () => {
    try {
        // Wait for database connection
        await waitForConnection();
        
        // Start a session for the transaction
        const session = await mongoose.startSession();
        session.startTransaction();
        
        try {
            // Clear existing products
            await Product.deleteMany({}).session(session);
            
            // Reset the auto-increment counter
            await mongoose.connection.db.collection('counters').updateOne(
                { _id: 'product_id' },
                { $set: { seq: 0 } },
                { upsert: true, session }
            );
            
            // Insert products with auto-incrementing IDs
            for (const product of products) {
                // Remove the ID to let mongoose-sequence handle it
                const { id, ...productData } = product;
                const newProduct = new Product(productData);
                await newProduct.save({ session });
            }
            
            await session.commitTransaction();
            console.log(`✅ Successfully imported ${products.length} products.`);
            return true;
            
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
        
    } catch (error) {
        console.error('❌ Error importing default data:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        }
        return false;
    }
};

export default DefaultData;