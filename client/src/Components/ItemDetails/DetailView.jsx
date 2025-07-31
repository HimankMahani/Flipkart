import { useEffect } from 'react';
import { styled, Box, Typography, Grid, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ProductDetail from './ProductDetail';
import ActionItem from './ActionItem';
import { getProductDetails } from '../../redux/actions/productActions';

const Component = styled(Box)`
    margin-top: 55px;
    background: #F2F2F2;
`;

const Container = styled(Grid)(({ theme }) => ({
    background: '#FFFFFF',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}))

const RightContainer = styled(Grid)`
    margin-top: 50px;
    & > p {
        margin-top: 10px;
    }
`;

const DetailView = () => {
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png'
    
    const { id } = useParams();
    const dispatch = useDispatch();
    
    const { loading, product, error } = useSelector(state => state.getProductDetails);
    
    useEffect(() => {
        dispatch(getProductDetails(id));
    }, [dispatch, id]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
                <Typography style={{ marginLeft: 15 }}>Loading Product...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <Typography color="error">Error loading product. Please try again later.</Typography>
            </Box>
        );
    }

    if (!product || Object.keys(product).length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <Typography>Product not found.</Typography>
            </Box>
        );
    }

    return (
        <Component>
            <Box></Box>
            <Container container> 
                <Grid item lg={4} md={4} sm={8} xs={12}>
                    <ActionItem product={product} />
                </Grid>
                <RightContainer item lg={8} md={8} sm={8} xs={12}>
                    <Typography variant="h5">
                        {product.title?.longTitle || 'Product Title Not Available'}
                    </Typography>
                    <Typography style={{marginTop: 5, color: '#878787', fontSize: 14 }}>
                        8 Ratings & 1 Reviews
                        <span><img src={fassured} alt="Flipkart Assured" style={{width: 77, marginLeft: 20}} /></span>
                    </Typography>
                    <Typography>
                        <span style={{ fontSize: 28 }}>₹{product.price?.cost || 'N/A'}</span>
                        {product.price?.mrp && (
                            <>
                                &nbsp;&nbsp;&nbsp;
                                <span style={{ color: '#878787' }}>
                                    <strike>₹{product.price.mrp}</strike>
                                </span>
                            </>
                        )}
                        {product.price?.discount && (
                            <>
                                &nbsp;&nbsp;&nbsp;
                                <span style={{ color: '#388E3C' }}>
                                    {product.price.discount} off
                                </span>
                            </>
                        )}
                    </Typography>
                    <ProductDetail product={product} />
                </RightContainer>
            </Container>
        </Component>
    )
}

export default DetailView;