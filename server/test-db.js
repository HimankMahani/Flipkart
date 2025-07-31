import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './model/productSchema.js';
import { products } from './constants/product.js';

dotenv.config();

async function testConnection() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connected to MongoDB');
        
        // Test if we can access the database
        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        console.log('\n📂 Collections in database:');
        console.log(collections.map(c => `- ${c.name}`).join('\n'));
        
        // Check products collection
        console.log('\n📊 Checking products collection...');
        const productCount = await Product.countDocuments();
        console.log(`Found ${productCount} products in the database`);
        
        if (productCount === 0) {
            console.log('\n🔄 Importing sample products...');
            await Product.insertMany(products);
            console.log('✅ Successfully imported sample products');
            
            // Verify import
            const newCount = await Product.countDocuments();
            console.log(`✅ Now have ${newCount} products in the database`);
        }
        
        // Show a few sample products
        const sampleProducts = await Product.find().limit(3).lean();
        console.log('\nSample products:');
        sampleProducts.forEach((p, i) => {
            console.log(`\nProduct ${i + 1}:`);
            console.log(`ID: ${p.id}`);
            console.log(`Title: ${p.title?.longTitle || 'N/A'}`);
            console.log(`Price: ₹${p.price?.cost || 'N/A'}`);
        });
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.code === 'ECONNREFUSED') {
            console.error('Could not connect to MongoDB. Make sure the server is running and the connection string is correct.');
        }
    } finally {
        mongoose.connection.close();
    }
}

testConnection();
