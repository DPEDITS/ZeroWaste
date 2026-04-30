import User from "../models/User.js";
import Donation from "../models/Donation.js";

export const getStats = async (req, res) => {
  try {
    const volunteersCount = await User.countDocuments({ role: "volunteer", status: "approved" });
    const donorsCount = await User.countDocuments({ role: "donor" });
    
    // Total donations / meals saved (assuming 1 donation = 1 meal or if you have quantity, we can sum it)
    // Let's aggregate quantity if it's a number, otherwise just count donations
    const donations = await Donation.find();
    let mealsSaved = 0;
    donations.forEach(d => {
      // Assuming quantity is stored as a string or number. If string like "10 meals", parse it.
      // For simplicity, let's just count each donation as 1 meal if quantity isn't cleanly parseable,
      // or sum numeric quantities.
      const qty = parseInt(d.quantity);
      mealsSaved += isNaN(qty) ? 1 : qty;
    });

    const addresses = await Donation.distinct("donorAddress");
    const communitiesServed = addresses.length;

    res.json({
      success: true,
      data: {
        volunteers: volunteersCount || 0,
        donors: donorsCount || 0,
        mealsSaved: mealsSaved || 0,
        communitiesServed: communitiesServed || 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch stats" });
  }
};
