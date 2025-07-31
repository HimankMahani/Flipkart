

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

        // Check if we already have products to avoid duplicates
        const count = await Product.countDocuments();
        if (count === 0) {
            console.log('No products found. Importing sample data...');
            await Product.deleteMany({});
            await Product.insertMany(products);
            console.log('✅ Sample products imported successfully!');
        } else {
            console.log(`✅ Found ${count} existing products in the database.`);
        }
        
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