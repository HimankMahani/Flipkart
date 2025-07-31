import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    url: String,
    detailUrl: String,
    title: {
        shortTitle: String,
        longTitle: String
    },
    price: {
        mrp: Number,
        cost: Number,
        discount: String
    },
    quantity: { type: Number, default: 1 },
    description: String,
    discount: String,
    tagline: String
}, { timestamps: true });

// Create an index on the id field for faster lookups
productSchema.index({ id: 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;