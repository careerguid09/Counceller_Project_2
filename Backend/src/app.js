const express = require("express");
const cors = require("cors");
const clientRoutes = require("./routes/clientRoutes");
const counselorRoutes = require("./routes/counselorRoutes");
const emailRoutes = require("./routes/emailRoutes"); // Naya email route

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "https://counceller-project-2.vercel.app",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ HOME ROUTE - 404 fix
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'SS Admission Vala API is running',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      home: 'GET /',
      health: 'GET /health',
      sendEmail: 'POST /api/send-career-email',
      counselorLogin: 'POST /api/counselor/login',
      clients: 'POST /api/clients/register'
    },
    services: {
      mongodb: '✅ Connected',
      email: '✅ Resend Active'
    },
    timestamp: new Date().toISOString()
  });
});

// ✅ HEALTH CHECK - Render ke liye
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    mongodb: true,
    email: true,
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use("/api/clients", clientRoutes);
app.use("/api/counselor", counselorRoutes);
app.use("/api", emailRoutes); // Email routes

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    requestedUrl: req.originalUrl,
    availableRoutes: [
      'GET /',
      'GET /health',
      'POST /api/send-career-email',
      'POST /api/counselor/login',
      'POST /api/clients/register'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({ 
    success: false, 
    message: "Something went wrong!",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = app;