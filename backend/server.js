const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const staffRoutes = require('./routes/staffRoutes');

// Load env vars
dotenv.config();

// Set node environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS with specific options
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/staff', staffRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('SolBot API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log('API endpoints:');
  console.log(`- Authentication: http://localhost:${PORT}/api/auth`);
  console.log(`- Staff Management: http://localhost:${PORT}/api/staff`);
});
