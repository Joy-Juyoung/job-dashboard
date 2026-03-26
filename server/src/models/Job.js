const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is required"],
    },
    company: {
      type: String,
      required: [true, "Company is required"],
      trim: true,
      minlength: [2, "Company must be at least 2 characters"],
      maxlength: [100, "Company must be less than 100 characters"],
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
      minlength: [2, "Position must be at least 2 characters"],
      maxlength: [100, "Position must be less than 100 characters"],
    },
    status: {
      type: String,
      enum: ["Applied", "Interview", "Offer", "Rejected"],
      default: "Applied",
    },
    location: {
      type: String,
      trim: true,
      maxlength: [100, "Location must be less than 100 characters"],
      default: "",
    },
    appliedDate: {
      type: String,
      required: [true, "Applied date is required"],
      default: "",
    },
    interviewDate: {
      type: String,
      default: "",
    },
    offerDate: {
      type: String,
      default: "",
    },
    rejectedDate: {
      type: String,
      default: "",
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, "Notes must be less than 500 characters"],
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Job", jobSchema);
