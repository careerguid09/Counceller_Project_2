const express = require("express");
const cors = require("cors");
const clientRoutes = require("./routes/clientRoutes");
const counselorRoutes = require("./routes/counselorRoutes");
const emailRoutes = require("./routes/emailRoutes");

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "https://counceller-project-2.vercel.app",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'SS Admission Vala API is running',
    version: '1.0.0',
    endpoints: {
      home: 'GET /',
      health: 'GET /health',
      sendEmail: 'POST /api/send-career-email',
      counselorLogin: 'POST /api/counselor/login'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use("/api/clients", clientRoutes);
app.use("/api/counselor", counselorRoutes);
app.use("/api", emailRoutes);

// ✅ FIXED: 404 handler - NO WILDCARD '*'
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    requestedUrl: req.originalUrl,
    method: req.method
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({ 
    success: false, 
    message: "Something went wrong!"
  });
});

module.exports = app;