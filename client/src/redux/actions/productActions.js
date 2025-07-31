import * as actionTypes from '../constants/productConstant';
import axios from 'axios';

export const getProducts = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_PRODUCTS_REQUEST });
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000'}/products`);
        
        if (response.data.success) {
            dispatch({ 
                type: actionTypes.GET_PRODUCTS_SUCCESS, 
                payload: response.data 
            });
        } else {
            dispatch({ 
                type: actionTypes.GET_PRODUCTS_FAIL, 
                payload: response.data.message || 'Failed to fetch products' 
            });
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        dispatch({ 
            type: actionTypes.GET_PRODUCTS_FAIL, 
            payload: error.response?.data?.message || error.message || 'Network error. Please check your connection.'
        });
    }
};

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });
        
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000'}/product/${id}`);
        
        if (response.data.success) {
            dispatch({ 
                type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS, 
                payload: response.data 
            });
        } else {
            dispatch({
                type: actionTypes.GET_PRODUCT_DETAILS_FAIL,
                payload: response.data.message || 'Failed to fetch product details'
            });
        }
    } catch (error) {
        console.error('Error fetching product details:', error);
        dispatch({ 
            type: actionTypes.GET_PRODUCT_DETAILS_FAIL, 
            payload: error.response?.data?.message || error.message || 'Failed to load product details. Please try again later.'
        });
    }
};


export const removeProductDetails = () => (dispatch) => {
    
    dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_RESET });

};
