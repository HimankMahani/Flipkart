import Product from '../model/productSchema.js';

export const getProducts = async (request, response) => {
    try {
        console.log('Fetching all products...');
        const products = await Product.find({}).lean();
        
        if (!products || products.length === 0) {
            console.warn('No products found in the database');
            return response.status(404).json({ 
                success: false, 
                message: 'No products found' 
            });
        }

        console.log(`Successfully fetched ${products.length} products`);
        response.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
        
    } catch (error) {
        console.error('Error fetching products:', error);
        response.status(500).json({
            success: false,
            message: 'Server error while fetching products',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const getProductById = async (request, response) => {
    try {
        const productId = request.params.id;
        console.log(`Fetching product with ID: ${productId}`);
        
        if (!productId) {
            return response.status(400).json({
                success: false,
                message: 'Product ID is required'
            });
        }

        const product = await Product.findOne({ id: productId }).lean();
        
        if (!product) {
            console.warn(`Product not found with ID: ${productId}`);
            return response.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        console.log(`Successfully fetched product: ${productId}`);
        response.status(200).json({
            success: true,
            data: product
        });
        
    } catch (error) {
        console.error(`Error fetching product with ID ${request.params.id}:`, error);
        response.status(500).json({
            success: false,
            message: 'Server error while fetching product',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};