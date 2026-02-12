const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Counselor = require("./src/models/Counselor");
import dotenv from "dotenv";
dotenv.config();

async function seedCounselor() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const existing = await Counselor.findOne({
      email: "counselor@company.com",
    });
    if (existing) {
      console.log("  Counselor already exists. Deleting...");
      await Counselor.deleteOne({ email: "counselor@company.com" });
    }

    const hashedPassword = await bcrypt.hash("Counselor@123#Secure", 10);
    const counselor = await Counselor.create({
      email: "counselor@company.com",
      password: hashedPassword,
    });

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);

    process.exit(1);
  }
}

seedCounselor();
