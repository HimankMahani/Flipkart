import * as actionTypes from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: []}, action) => {
    console.log('Cart Reducer - Action:', action.type, 'Payload:', action.payload);
    
    switch(action.type) {
        case actionTypes.ADD_TO_CART:
            const item = action.payload;
            console.log('Adding item to cart:', item);

            const existItem = state.cartItems.find(product => product.id === item.id);
            
            if(existItem){
                console.log('Item already exists in cart, updating quantity');
                return {
                    ...state, cartItems: state.cartItems.map(x => x.id === existItem.id ? item : x)
                }
            } else {
                console.log('Adding new item to cart');
                return  { ...state, cartItems: [...state.cartItems, item]}
            }
        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state, cartItems: state.cartItems.filter(product => product.id !== action.payload)
            }
        case actionTypes.CART_RESET:
            console.log('Cart cleared successfully');
            return {
                ...state, cartItems: []
            }
        default:
            return state;
    }
}