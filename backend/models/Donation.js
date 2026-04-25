import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    foodItem: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    donorName: {
      type: String,
      required: true,
    },
    donorAddress: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "picked", "delivered"],
      default: "pending",
    },
    volunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    proofImage: {
      type: String, // Store the filename or URL
    },
  },
  { timestamps: true }
);

export default mongoose.model("Donation", donationSchema);
