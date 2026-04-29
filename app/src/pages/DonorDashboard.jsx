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
        // For now, filter donations by donorName matching user's name since we don't have donorId on donation model
        // Ideal way would be to have donor reference in donation model
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
      <h2>Donor Dashboard</h2>
      <div className="row mt-4">
        <div className="col-md-3 mb-3">
          <div className="card p-3 text-center bg-primary text-white shadow-sm">
            <h3>{stats.total}</h3>
            <p>Total Donations</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card p-3 text-center bg-warning text-dark shadow-sm">
            <h3>{stats.pending}</h3>
            <p>Awaiting Pickup</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card p-3 text-center bg-info text-white shadow-sm">
            <h3>{stats.picked}</h3>
            <p>Picked Up</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card p-3 text-center bg-success text-white shadow-sm">
            <h3>{stats.delivered}</h3>
            <p>Delivered</p>
          </div>
        </div>
      </div>
    </DonorLayout>
  );
};

export default DonorDashboard;
