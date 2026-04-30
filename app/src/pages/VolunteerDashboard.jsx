import { useState, useEffect } from "react";
import VolunteerLayout from "../components/VolunteerLayout";
import axios from "axios";

const VolunteerDashboard = () => {
  const [stats, setStats] = useState({ pending: 0, delivered: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await axios.get("http://localhost:5000/api/donations/all");
        const donations = res.data || [];

        const pending = donations.filter(d => d.status === "pending").length;
        const delivered = donations.filter(d => d.volunteer && d.volunteer._id === user._id && d.status === "delivered").length;

        setStats({ pending, delivered });
      } catch (err) {
        console.error("Error fetching stats", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <VolunteerLayout>
      <div className="vol-page-header">
        <h1 className="vol-page-title">Volunteer Dashboard</h1>
        <p className="vol-page-subtitle">Track your deliveries and community impact</p>
      </div>

      <div className="vol-stats-grid">
        <div className="vol-stat-card pending">
          <div className="stat-card-icon pending">⏳</div>
          <div className="stat-card-number">{stats.pending}</div>
          <div className="stat-card-label">Pending Pickups Available</div>
        </div>

        <div className="vol-stat-card delivered">
          <div className="stat-card-icon delivered">✅</div>
          <div className="stat-card-number">{stats.delivered}</div>
          <div className="stat-card-label">Successful Deliveries</div>
        </div>
      </div>
    </VolunteerLayout>
  );
};

export default VolunteerDashboard;
