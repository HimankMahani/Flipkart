import * as actionTypes from '../constants/productConstant';


export const getProductReducer = (state = {products: [], loading: false, error: null}, action) => {
    switch(action.type) {
        case actionTypes.GET_PRODUCTS_REQUEST:
            return { 
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.GET_PRODUCTS_SUCCESS:
            // The API returns {success: true, count: X, data: [...]}
            return { 
                ...state,
                products: action.payload.data || [],
                loading: false,
                error: null
            };
        case actionTypes.GET_PRODUCTS_FAIL:
            return { 
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export const getProductDetailsReducer = (state = { 
    product: {}, 
    loading: false, 
    error: null 
}, action) => {
    
    switch(action.type) {
        case actionTypes.GET_PRODUCT_DETAILS_REQUEST:
            return { 
                ...state,
                loading: true,
                error: null
            };
            
        case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
            // The API returns {success: true, data: {...}}
            return { 
                ...state,
                loading: false,
                product: action.payload.data || {},
                error: null
            };
            
        case actionTypes.GET_PRODUCT_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload || 'Failed to fetch product details'
            };
            
        case actionTypes.GET_PRODUCT_DETAILS_RESET: 
            return {
                product: {},
                loading: false,
                error: null
            };
            
        default:
            return state;
    }
};