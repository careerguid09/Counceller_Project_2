const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...");
    
    if (!process.env.MONGO_URI) {
      console.log("⚠️ MONGO_URI not defined, using memory fallback");
      return; // App bina DB ke bhi chalega
    }
    
    // Connection options with IPv4 fix
    const options = {
      family: 4, // Force IPv4
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
      socketTimeoutMS: 45000,
    };
    
    const conn = await mongoose.connect(process.env.MONGO_URI, options);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    
    // Don't exit in production, let the app run without DB if needed
    if (process.env.NODE_ENV === 'development') {
      console.log("⚠️ Running in development mode without MongoDB");
    } else {
      console.log("⚠️ Continuing without MongoDB - email service will still work");
      // process.exit(1) mat karo, email service chalni chahiye
    }
  }
};

module.exports = connectDB;