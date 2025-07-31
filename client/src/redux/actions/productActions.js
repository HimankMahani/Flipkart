import * as actionTypes from '../constants/productConstant';
import axios from 'axios';

export const getProducts = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_PRODUCTS_REQUEST });
        const { data } = await axios.get(`http://localhost:8000/products`);
        
        if (data.success) {
            dispatch({ 
                type: actionTypes.GET_PRODUCTS_SUCCESS, 
                payload: data 
            });
        } else {
            dispatch({ 
                type: actionTypes.GET_PRODUCTS_FAIL, 
                payload: data.message || 'Failed to fetch products' 
            });
        }
    } catch (error) {
        dispatch({ 
            type: actionTypes.GET_PRODUCTS_FAIL, 
            payload: error.response?.data?.message || error.message 
        });
    }
};

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });
        
        const { data } = await axios.get(`http://localhost:8000/product/${id}`);
        
        if (data.success) {
            dispatch({ 
                type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS, 
                payload: data 
            });
        } else {
            dispatch({
                type: actionTypes.GET_PRODUCT_DETAILS_FAIL,
                payload: data.message || 'Failed to fetch product details'
            });
        }
    } catch (error) {
        dispatch({ 
            type: actionTypes.GET_PRODUCT_DETAILS_FAIL, 
            payload: error.response?.data?.message || error.message 
        });
    }
};


export const removeProductDetails = () => (dispatch) => {
    
    dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_RESET });

};
