import { useState, useEffect } from "react";
import DonorLayout from "../components/DonorLayout";
import axios from "axios";

const DonorDashboard = () => {
  const [stats, setStats] = useState({ total: 0, pending: 0, picked: 0, delivered: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;

        const res = await axios.get("http://localhost:5000/api/donations/all");
        const myDonations = res.data.filter(d => d.donorName === user.name);

        setStats({
          total: myDonations.length,
          pending: myDonations.filter(d => d.status === "pending").length,
          picked: myDonations.filter(d => d.status === "picked").length,
          delivered: myDonations.filter(d => d.status === "delivered").length,
        });
      } catch (err) {
        console.error("Error fetching stats", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <DonorLayout>
      <div className="donor-page-header">
        <h1 className="donor-page-title">Donor Dashboard</h1>
        <p className="donor-page-subtitle">Track your food donations and overall impact</p>
      </div>

      <div className="donor-stats-grid">
        <div className="donor-stat-card total">
          <div className="stat-card-icon total">📊</div>
          <div className="stat-card-number">{stats.total}</div>
          <div className="stat-card-label">Total Donations</div>
        </div>

        <div className="donor-stat-card pending">
          <div className="stat-card-icon pending">⏳</div>
          <div className="stat-card-number">{stats.pending}</div>
          <div className="stat-card-label">Awaiting Pickup</div>
        </div>

        <div className="donor-stat-card picked">
          <div className="stat-card-icon picked">🚚</div>
          <div className="stat-card-number">{stats.picked}</div>
          <div className="stat-card-label">Picked Up</div>
        </div>

        <div className="donor-stat-card delivered">
          <div className="stat-card-icon delivered">✅</div>
          <div className="stat-card-number">{stats.delivered}</div>
          <div className="stat-card-label">Delivered</div>
        </div>
      </div>
    </DonorLayout>
  );
};

export default DonorDashboard;
