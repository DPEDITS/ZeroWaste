import Donation from "../models/Donation.js";
import multer from "multer";
import path from "path";

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({ storage });

// Create a donation
export const createDonation = async (req, res) => {
  try {
    const { foodItem, quantity, donorName, donorAddress } = req.body;
    const donation = new Donation({
      foodItem,
      quantity,
      donorName,
      donorAddress,
    });
    await donation.save();
    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all donations
export const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().populate("volunteer", "name email");
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign volunteer to donation
export const assignVolunteer = async (req, res) => {
  try {
    const { donationId, volunteerId } = req.body;
    const donation = await Donation.findByIdAndUpdate(
      donationId,
      { volunteer: volunteerId, status: "picked" },
      { new: true }
    );
    res.json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upload proof and mark as delivered
export const uploadProof = async (req, res) => {
  try {
    const { donationId } = req.params;
    const proofImage = req.file ? req.file.filename : null;

    if (!proofImage) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const donation = await Donation.findByIdAndUpdate(
      donationId,
      { proofImage, status: "delivered" },
      { new: true }
    );

    res.json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
