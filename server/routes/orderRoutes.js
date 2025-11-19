import { sendOrderConfirmation } from '../services/emailService.js';

export const submitOrder = async (req, res) => {
  try {
    const { customerName, customerEmail, items, totalPrice } = req.body;

    // Validate input
    if (!customerName || !customerEmail || !items || items.length === 0 || !totalPrice) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Generate order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create order object
    const orderData = {
      orderId,
      customerName,
      customerEmail,
      items,
      totalPrice,
      orderDate: new Date()
    };

    // Send confirmation email
    const emailResult = await sendOrderConfirmation(orderData);

    if (emailResult.success) {
      return res.status(200).json({
        success: true,
        message: 'Order submitted successfully',
        orderId,
        emailSent: true
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Order created but email failed to send',
        orderId,
        error: emailResult.error
      });
    }
  } catch (error) {
    console.error('Error submitting order:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit order',
      error: error.message
    });
  }
};

export const testEmail = async (req, res) => {
  try {
    const testOrder = {
      orderId: 'TEST-001',
      customerName: 'John Doe',
      customerEmail: process.env.GMAIL_USER,
      items: [
        {
          name: 'Professional Violin',
          quantity: 1,
          price: 299.99
        },
        {
          name: 'Music Stand',
          quantity: 2,
          price: 49.99
        }
      ],
      totalPrice: 399.97,
      orderDate: new Date()
    };

    const emailResult = await sendOrderConfirmation(testOrder);

    return res.status(200).json({
      success: emailResult.success,
      message: emailResult.message,
      messageId: emailResult.messageId
    });
  } catch (error) {
    console.error('Error testing email:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send test email',
      error: error.message
    });
  }
};
