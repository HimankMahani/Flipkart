import { useState, useEffect, useCallback } from 'react';
import { Box, Typography, styled } from '@mui/material';

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
`;

const Container = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    & > p {
        margin-bottom: 20px;
        font-size: 14px;
    }
`;

const Price = styled(Typography)`
    float: right;
`;

const TotalAmount = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
    border-top: 1px dashed #e0e0e0;
    padding: 20px 0;
    border-bottom: 1px dashed #e0e0e0;
`;

const Discount = styled(Typography)`
    font-size: 16px; 
    color: green;
`

// component: {
//     // width: '30%'
// },


const TotalView = ({ cartItems = [] }) => {
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const deliveryCharges = 40;

    const calculateTotal = useCallback(() => {
        if (!Array.isArray(cartItems)) {
            setPrice(0);
            setDiscount(0);
            return;
        }

        let totalPrice = 0, totalDiscount = 0;
        
        cartItems.forEach(item => {
            const itemPrice = item?.price || {};
            const itemMrp = parseFloat(itemPrice.mrp) || 0;
            const itemCost = parseFloat(itemPrice.cost) || 0;
            
            totalPrice += itemMrp;
            totalDiscount += (itemMrp - itemCost);
        });
        
        setPrice(Math.round(totalPrice * 100) / 100);
        setDiscount(Math.round(totalDiscount * 100) / 100);
    }, [cartItems]);

    useEffect(() => {
        calculateTotal();
    }, [calculateTotal]);
    
    const totalAmountValue = Math.max(0, price - discount + deliveryCharges);
    const totalSavings = Math.max(0, discount - deliveryCharges);
    const itemCount = cartItems?.length || 0;
    const itemText = itemCount === 1 ? 'item' : 'items';

    return (
        <Box component="div">
            <Header>
                <Typography component="div" variant="subtitle2">
                    PRICE DETAILS
                </Typography>
            </Header>
            <Container component="div">
                <Box component="div" display="flex" justifyContent="space-between" mb={2}>
                    <Typography component="span">
                        Price ({itemCount} {itemText})
                    </Typography>
                    <Price component="span">₹{price.toFixed(2)}</Price>
                </Box>
                
                <Box component="div" display="flex" justifyContent="space-between" mb={2}>
                    <Typography component="span">Discount</Typography>
                    <Price component="span" color="green">-₹{discount.toFixed(2)}</Price>
                </Box>
                
                <Box component="div" display="flex" justifyContent="space-between" mb={2}>
                    <Typography component="span">Delivery Charges</Typography>
                    <Price component="span">₹{deliveryCharges.toFixed(2)}</Price>
                </Box>
                
                <TotalAmount component="div">
                    <Box component="span">Total Amount</Box>
                    <Box component="span">₹{totalAmountValue.toFixed(2)}</Box>
                </TotalAmount>
                
                <Discount component="div">
                    You will save ₹{totalSavings.toFixed(2)} on this order
                </Discount>
            </Container>
        </Box>
    )
}

export default TotalView;