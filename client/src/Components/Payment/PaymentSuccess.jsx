import React from 'react';
import { Box, Typography, Button, Card, CardContent, styled } from '@mui/material';
import { CheckCircle, Home, ShoppingBag } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    padding: '20px',
    backgroundColor: '#f5f5f5'
}));

const SuccessCard = styled(Card)(({ theme }) => ({
    maxWidth: 500,
    width: '100%',
    textAlign: 'center',
    padding: '40px 20px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    borderRadius: '12px'
}));

const SuccessIcon = styled(CheckCircle)(({ theme }) => ({
    fontSize: '80px',
    color: '#4caf50',
    marginBottom: '20px'
}));

const Title = styled(Typography)(({ theme }) => ({
    fontSize: '28px',
    fontWeight: 600,
    color: '#2e7d32',
    marginBottom: '16px'
}));

const Subtitle = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    color: '#666',
    marginBottom: '30px',
    lineHeight: 1.5
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: '30px'
}));

const StyledButton = styled(Button)(({ theme }) => ({
    minWidth: '140px',
    height: '48px',
    borderRadius: '8px',
    textTransform: 'none',
    fontSize: '16px',
    fontWeight: 500
}));

const PaymentSuccess = () => {
    const navigate = useNavigate();

    const handleContinueShopping = () => {
        navigate('/');
    };

    const handleViewOrders = () => {
        // For now, navigate to home. In a real app, this would go to orders page
        navigate('/');
    };

    return (
        <Container>
            <SuccessCard>
                <CardContent>
                    <SuccessIcon />
                    <Title>Payment Successful!</Title>
                    <Subtitle>
                        Thank you for your purchase. Your order has been placed successfully 
                        and you will receive a confirmation email shortly.
                    </Subtitle>
                    
                    <Box sx={{ 
                        backgroundColor: '#f8f9fa', 
                        padding: '16px', 
                        borderRadius: '8px',
                        margin: '20px 0'
                    }}>
                        <Typography variant="body2" color="textSecondary">
                            Order ID: #FL{Math.random().toString(36).substr(2, 9).toUpperCase()}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                            Estimated delivery: 3-5 business days
                        </Typography>
                    </Box>

                    <ButtonContainer>
                        <StyledButton
                            variant="contained"
                            startIcon={<Home />}
                            onClick={handleContinueShopping}
                            sx={{
                                backgroundColor: '#ff9f00',
                                '&:hover': {
                                    backgroundColor: '#e68900'
                                }
                            }}
                        >
                            Continue Shopping
                        </StyledButton>
                        
                        <StyledButton
                            variant="outlined"
                            startIcon={<ShoppingBag />}
                            onClick={handleViewOrders}
                            sx={{
                                borderColor: '#ff9f00',
                                color: '#ff9f00',
                                '&:hover': {
                                    borderColor: '#e68900',
                                    backgroundColor: 'rgba(255, 159, 0, 0.04)'
                                }
                            }}
                        >
                            View Orders
                        </StyledButton>
                    </ButtonContainer>
                </CardContent>
            </SuccessCard>
        </Container>
    );
};

export default PaymentSuccess;
