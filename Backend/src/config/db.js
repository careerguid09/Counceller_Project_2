const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.log("⚠️ MONGO_URI not defined, using local fallback");
    }
    
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/counselor_db');
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    
    // Don't exit in production, let the app run without DB if needed
    if (process.env.NODE_ENV === 'development') {
      console.log("⚠️ Running in development mode without MongoDB");
    }
  }
};

module.exports = connectDB;