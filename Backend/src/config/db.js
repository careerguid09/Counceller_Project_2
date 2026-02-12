
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" MongoDB Connected Successfully!");
  } catch (error) {
    console.error(" MongoDB Connection Failed:", error.message);

    if (process.env.NODE_ENV === 'development') {
      console.log("  Running in development mode without MongoDB");
    }
  }
};

module.exports = connectDB;