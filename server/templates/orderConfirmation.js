const generateOrderConfirmationEmail = (order) => {
  const { orderId, customerName, customerEmail, items, totalPrice, orderDate } = order;

  const itemsHTML = items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #ddd;">${item.name}</td>
      <td style="padding: 12px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #ddd; text-align: right;">$${item.price.toFixed(2)}</td>
      <td style="padding: 12px; border-bottom: 1px solid #ddd; text-align: right;">$${(item.quantity * item.price).toFixed(2)}</td>
    </tr>
  `
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: #f9f9f9;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: bold;
        }
        .header p {
          margin: 5px 0 0 0;
          font-size: 14px;
          opacity: 0.9;
        }
        .content {
          padding: 30px;
          background: white;
        }
        .greeting {
          margin-bottom: 20px;
          font-size: 16px;
        }
        .order-info {
          background: #f5f5f5;
          padding: 15px;
          border-left: 4px solid #667eea;
          margin: 20px 0;
          border-radius: 4px;
        }
        .order-info p {
          margin: 8px 0;
          font-size: 14px;
        }
        .order-info strong {
          color: #667eea;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        table th {
          background: #667eea;
          color: white;
          padding: 12px;
          text-align: left;
          font-weight: bold;
        }
        .total-row {
          background: #f5f5f5;
          font-weight: bold;
          font-size: 16px;
        }
        .total-row td {
          padding: 15px 12px;
          border-top: 2px solid #667eea;
        }
        .footer {
          background: #f5f5f5;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #666;
          border-top: 1px solid #ddd;
        }
        .button {
          display: inline-block;
          background: #667eea;
          color: white;
          padding: 12px 30px;
          text-decoration: none;
          border-radius: 4px;
          margin-top: 20px;
          font-weight: bold;
        }
        .button:hover {
          background: #764ba2;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎭 ArtBeat</h1>
          <p>Order Confirmation</p>
        </div>

        <div class="content">
          <div class="greeting">
            <p>Hi <strong>${customerName}</strong>,</p>
            <p>Thank you for your order! We're excited to prepare your performing arts products for delivery.</p>
          </div>

          <div class="order-info">
            <p><strong>Order ID:</strong> #${orderId}</p>
            <p><strong>Order Date:</strong> ${new Date(orderDate).toLocaleDateString()}</p>
            <p><strong>Email:</strong> ${customerEmail}</p>
          </div>

          <h3 style="color: #333; margin-top: 30px; margin-bottom: 15px;">Order Summary</h3>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th style="text-align: center;">Qty</th>
                <th style="text-align: right;">Price</th>
                <th style="text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHTML}
              <tr class="total-row">
                <td colspan="3" style="text-align: right;">Total Amount:</td>
                <td style="text-align: right;">$${totalPrice.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <a href="https://artbeat.com/orders/${orderId}" class="button">View Order Details</a>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="font-size: 14px; color: #666;">
              We'll notify you when your order ships. If you have any questions, please don't hesitate to contact us.
            </p>
          </div>
        </div>

        <div class="footer">
          <p>&copy; 2024 ArtBeat. All rights reserved.</p>
          <p>Your destination for premium performing arts products</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export default generateOrderConfirmationEmail;
