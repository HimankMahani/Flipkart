

import Product from './model/productSchema.js';
import { products } from './constants/product.js';
import mongoose from 'mongoose';

const DefaultData = async () => {
    try {
        // Check if we have a valid database connection
        if (mongoose.connection.readyState !== 1) {
            console.warn('No active database connection. Will retry in 2 seconds...');
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            if (mongoose.connection.readyState !== 1) {
                throw new Error('Could not establish database connection');
            }
        }

        // First, clear any existing products
        await Product.deleteMany({});
        
        // Reset the auto-increment counter
        const counter = await mongoose.connection.db.collection('counters').findOneAndUpdate(
            { _id: 'product_id' },
            { $set: { seq: 0 } },
            { upsert: true, returnOriginal: false }
        );
        
        // Insert products with auto-incrementing IDs
        for (const product of products) {
            // Remove the ID to let mongoose-sequence handle it
            const { id, ...productData } = product;
            const newProduct = new Product(productData);
            await newProduct.save();
        }
        
        console.log(`✅ Successfully imported ${products.length} products.`);
        
        return true;
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