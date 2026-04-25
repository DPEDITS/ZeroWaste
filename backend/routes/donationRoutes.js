import express from "express";
import {
  createDonation,
  getDonations,
  assignVolunteer,
  uploadProof,
  upload,
} from "../controllers/donationController.js";

const router = express.Router();

router.post("/create", createDonation);
router.get("/all", getDonations);
router.put("/assign", assignVolunteer);
router.put("/upload-proof/:donationId", upload.single("proofImage"), uploadProof);

export default router;
