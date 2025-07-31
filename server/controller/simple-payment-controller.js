// Simple payment controller: always returns success immediately

export const addPaymentGateway = (req, res) => {
  return res.json({ success: true, message: 'Payment complete. Thank you!' });
};

export const paymentResponse = (req, res) => {
  return res.json({ success: true, message: 'Payment complete. Thank you!' });
};
