import * as actionTypes from '../constants/cartConstants';
import axios from 'axios';

export const addToCart = (id, quantity) => async (dispatch) => {
    try { 
        const response = await axios.get(`http://localhost:8000/product/${id}`);
        console.log('Cart API Response:', response.data);
        
        // Extract product data from the API response structure
        const productData = response.data.success ? response.data.data : response.data;
        
        if (!productData) {
            console.error('No product data received from API');
            return;
        }
        
        console.log('Product data for cart:', productData);
        dispatch({ type: actionTypes.ADD_TO_CART, payload: { ...productData, quantity } });

    } catch (error) {
        console.error('Error while calling cart API:', error);
    }
};

export const removeFromCart = (id) => (dispatch) => {
    dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        payload: id
    })
};

export const clearCart = () => (dispatch) => {
    console.log('Clearing cart after successful order');
    dispatch({
        type: actionTypes.CART_RESET
    })
};