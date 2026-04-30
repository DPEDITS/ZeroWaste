import User from "../models/User.js";
import Donation from "../models/Donation.js";

export const getNotifications = async (req, res) => {
  try {
    const { role, userId, name } = req.query;

    let notifications = [];
    
    if (role === 'admin') {
      const pendingUsers = await User.find({ status: "pending" }).sort({ createdAt: -1 }).limit(10);
      pendingUsers.forEach(u => {
        notifications.push({
          id: `user-${u._id}`,
          type: 'user',
          text: `New ${u.role} registration: ${u.name} requires approval`,
          time: u.createdAt || new Date(),
          displayTime: new Date(u.createdAt || new Date()).toLocaleString()
        });
      });

      const pendingDonations = await Donation.find({ status: "pending" }).sort({ createdAt: -1 }).limit(10);
      pendingDonations.forEach(d => {
        notifications.push({
          id: `food-${d._id}`,
          type: 'food',
          text: `New food donation listed by ${d.donorName} (${d.foodItem})`,
          time: d.createdAt || new Date(),
          displayTime: new Date(d.createdAt || new Date()).toLocaleString()
        });
      });
    }

    if (role === 'volunteer') {
      const pendingDonations = await Donation.find({ status: "pending" }).sort({ createdAt: -1 }).limit(10);
      pendingDonations.forEach(d => {
        notifications.push({
          id: `alert-${d._id}`,
          type: 'alert',
          text: `New food donation available: ${d.foodItem} at ${d.donorAddress}`,
          time: d.createdAt || new Date(),
          displayTime: new Date(d.createdAt || new Date()).toLocaleString()
        });
      });

      if (userId) {
        const myDeliveries = await Donation.find({ volunteer: userId, status: "delivered" }).sort({ createdAt: -1 }).limit(10);
        myDeliveries.forEach(d => {
          notifications.push({
            id: `success-${d._id}`,
            type: 'success',
            text: `Your delivery of ${d.foodItem} was confirmed!`,
            time: d.updatedAt || d.createdAt || new Date(),
            displayTime: new Date(d.updatedAt || d.createdAt || new Date()).toLocaleString()
          });
        });
      }
    }

    if (role === 'donor' && name) {
      const pickedDonations = await Donation.find({ donorName: name, status: "picked" }).sort({ createdAt: -1 }).limit(10);
      pickedDonations.forEach(d => {
        notifications.push({
          id: `pickup-${d._id}`,
          type: 'pickup',
          text: `Volunteer assigned to pick up your donation of ${d.foodItem}`,
          time: d.updatedAt || d.createdAt || new Date(),
          displayTime: new Date(d.updatedAt || d.createdAt || new Date()).toLocaleString()
        });
      });

      const deliveredDonations = await Donation.find({ donorName: name, status: "delivered" }).sort({ createdAt: -1 }).limit(10);
      deliveredDonations.forEach(d => {
        notifications.push({
          id: `delivered-${d._id}`,
          type: 'delivered',
          text: `Your donation of ${d.foodItem} was successfully delivered!`,
          time: d.updatedAt || d.createdAt || new Date(),
          displayTime: new Date(d.updatedAt || d.createdAt || new Date()).toLocaleString()
        });
      });
    }

    // Sort all by time (descending)
    notifications.sort((a, b) => new Date(b.time) - new Date(a.time));

    res.json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
