import { Card, Box, Typography, Button, styled } from '@mui/material';
import { addEllipsis } from '../../utils/util';
import GroupButton from './GroupButton';

// Base64 encoded 1x1 transparent pixel as fallback
const TRANSPARENT_PIXEL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

const Component = styled(Card)`
    border-top: 1px solid #f0f0f0;
    border-radius: 0px;
    display: flex;
`;

const LeftComponent = styled(Box)`
    margin: 20px; 
    display: flex;
    flex-direction: column;
`;

const SmallText = styled(Typography)`
    color: #878787;
    font-size: 14px;
    margin-top: 10px;
`;

const Cost = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
`;

const MRP = styled(Typography)`
    color: #878787;
`;

const Discount = styled(Typography)`
    color: #388E3C;
`;

const Remove = styled(Button)`
    margin-top: 20px;
    font-size: 16px;
`;

const CartItem = ({ item, removeItemFromCart }) => {
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';

    if (!item) return null;

    // Safely access nested properties with fallbacks
    const getTitle = () => {
        if (item.title?.longTitle) return addEllipsis(item.title.longTitle);
        if (item.title) return addEllipsis(item.title);
        if (item.longTitle) return addEllipsis(item.longTitle);
        return 'Product Title Not Available';
    };

    const getImageUrl = () => {
        return item.url || item.detailUrl || item.image || TRANSPARENT_PIXEL;
    };

    const getPrice = () => {
        // Handle both nested price object and direct price properties
        const price = item.price || {};
        const cost = price.cost || item.cost || 0;
        const mrp = price.mrp || item.mrp || 0;
        const discount = price.discount || item.discount || '';
        
        return { cost, mrp, discount };
    };

    const { cost, mrp, discount } = getPrice();
    const showDiscount = discount && discount !== '0%';
    const showMrp = mrp && mrp > cost;

    return (
        <Component>
            <LeftComponent>
                <img 
                    src={getImageUrl()} 
                    alt={item.title?.shortTitle || item.title || 'Product'} 
                    style={{ 
                        height: 110, 
                        width: 110, 
                        objectFit: 'contain',
                        backgroundColor: '#f5f5f5',
                        border: '1px solid #e0e0e0',
                        borderRadius: 4
                    }}
                    onError={(e) => {
                        e.target.src = TRANSPARENT_PIXEL;
                        e.target.style.backgroundColor = '#f5f5f5';
                    }}
                />
                <GroupButton item={item} />
            </LeftComponent>
            <Box style={{ margin: 20 }} component="div">
                <Typography component="div" variant="subtitle1" style={{ fontWeight: 600 }}>
                    {getTitle()}
                </Typography>
                <Box component="div" mt={1}>
                    <SmallText component="span">Seller: RetailNet</SmallText>
                    <Box component="span" display="inline-flex" alignItems="center" ml={1}>
                        <img 
                            src={fassured} 
                            alt="Flipkart Assured" 
                            style={{ width: 55, height: 15, marginLeft: 5 }} 
                        />
                    </Box>
                </Box>
                <Box component="div" style={{margin: '15px 0'}}>
                    <Cost component="span">₹{cost.toLocaleString('en-IN')}</Cost>
                    
                    {showMrp && (
                        <>
                            <Box component="span" mx={1} style={{ color: '#878787' }}>|</Box>
                            <MRP component="span">
                                <strike>₹{mrp.toLocaleString('en-IN')}</strike>
                            </MRP>
                        </>
                    )}
                    
                    {showDiscount && (
                        <>
                            <Box component="span" mx={1} style={{ color: '#878787' }}>|</Box>
                            <Discount component="span">
                                {discount.includes('%') ? discount : `${discount} off`}
                            </Discount>
                        </>
                    )}
                </Box>
                <Remove onClick={() => removeItemFromCart(item.id)}>Remove</Remove>
            </Box>
        </Component>
    )
}

export default CartItem;