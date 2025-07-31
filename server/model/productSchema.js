import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
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

// Add auto-increment plugin to the schema
productSchema.plugin(AutoIncrement, {id: 'product_id', inc_field: 'id'});

const Product = mongoose.model('Product', productSchema);

export default Product;