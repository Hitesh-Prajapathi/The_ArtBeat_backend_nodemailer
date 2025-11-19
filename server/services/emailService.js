import transporter from '../config/mailer.js';
import generateOrderConfirmationEmail from '../templates/orderConfirmation.js';

export const sendOrderConfirmation = async (orderData) => {
  try {
    const htmlContent = generateOrderConfirmationEmail(orderData);

    const mailOptions = {
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: orderData.customerEmail,
      subject: `Order Confirmation #${orderData.orderId} - ArtBeat`,
      html: htmlContent
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    return {
      success: true,
      message: 'Order confirmation email sent successfully',
      messageId: info.messageId
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: 'Failed to send order confirmation email',
      error: error.message
    };
  }
};
