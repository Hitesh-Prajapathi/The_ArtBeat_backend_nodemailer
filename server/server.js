import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { submitOrder, testEmail } from './routes/orderRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Routes
app.post('/api/orders/submit', submitOrder);
app.get('/api/test-email', testEmail);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎭 ArtBeat Server running on port ${PORT}`);
  console.log(`Make sure you've set up your .env file with Gmail credentials`);
});
