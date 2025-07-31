import { useEffect } from 'react';

import { Box, Typography, Button, Grid, styled } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, clearCart } from '../../redux/actions/cartActions';

import TotalView from './TotalView';
import EmptyCart from './EmptyCart';
import CartItem from './CartItem';

import axios from 'axios';

const Component = styled(Grid)(({ theme }) => ({
    padding: '30px 135px',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
        padding: '15px 0'
    }
}));

const LeftComponent = styled(Grid)(({ theme }) => ({
    paddingRight: 15,
    [theme.breakpoints.down('sm')]: {
        marginBottom: 15
    }
}));

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
`;

const BottomWrapper = styled(Box)`
    padding: 16px 22px;
    background: #fff;
    box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
    border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
    display: flex;
    margin-left: auto;
    background: #fb641b;
    color: #fff;
    border-radius: 2px;
    width: 250px;
    height: 51px;
`;

const Cart = () => {
    const cartDetails = useSelector(state => state.cart);
    const { cartItems } = cartDetails;
    const { id } = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    
    console.log('Cart Component - cartDetails:', cartDetails);
    console.log('Cart Component - cartItems:', cartItems);
    console.log('Cart Component - URL id:', id);
    
    useEffect(() => {
        // Only add to cart if there's an id in the URL and the item isn't already in cart
        if(id && Array.isArray(cartItems) && !cartItems.find(item => item.id === id)) {
            console.log('Adding product to cart from URL:', id);
            dispatch(addToCart(id, 1));
        }
    }, [dispatch, id, cartItems]);

    const removeItemFromCart = (id) => {
        dispatch(removeFromCart(id));
    }

    const buyNow = async () => {
        try {
            await axios.post('http://localhost:8000/payment');
            
            // Clear the cart after successful payment
            dispatch(clearCart());
            
            // Navigate to payment success page
            navigate('/payment/success');
        } catch (error) {
            console.error('Payment failed:', error);
            alert('Payment failed. Please try again.');
        }
    }

    return (
        <>
        { cartItems.length ? 
            <Component container>
                <LeftComponent item lg={9} md={9} sm={12} xs={12}>
                    <Header>
                        <Typography style={{fontWeight: 600, fontSize: 18}}>My Cart ({cartItems?.length || 0})</Typography>
                    </Header>
                    {Array.isArray(cartItems) && cartItems.length > 0 ? (
                        cartItems.map(item => (
                            <CartItem 
                                key={item.id || Math.random().toString(36).substr(2, 9)} 
                                item={item} 
                                removeItemFromCart={removeItemFromCart}
                            />
                        ))
                    ) : (
                        <Box p={2} textAlign="center">
                            <Typography>Your cart is empty</Typography>
                        </Box>
                    )}
                    <BottomWrapper>
                        <StyledButton onClick={() => buyNow()} variant="contained">Place Order</StyledButton>
                    </BottomWrapper>
                </LeftComponent>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TotalView cartItems={cartItems} />
                </Grid>
            </Component> : <EmptyCart />
        }
        </>

    )
}

export default Cart;