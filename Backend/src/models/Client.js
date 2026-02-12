
const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: Date,
    },
    age: {
      type: Number,
    },
    country: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    eduLevel: {
      type: String, 
      required: true,
    },
    domain: {
      type: String, 
      trim: true,
    },
    course: {
      type: String, 
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["new", "in-progress", "completed"],
      default: "new",
    },

    isNew: {
      type: Boolean,
      default: true
    },
    domainViewed: {
      type: Boolean,
      default: false
    },
    courseViewed: {
      type: Boolean,
      default: false
    },
    studentViewed: {
      type: Boolean,
      default: false
    },
    newAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);


clientSchema.index({ domain: 1, domainViewed: 1, newAt: 1 });
clientSchema.index({ course: 1, courseViewed: 1, newAt: 1 });
clientSchema.index({ studentViewed: 1, isNew: 1, newAt: 1 });

module.exports = mongoose.model("Client", clientSchema);