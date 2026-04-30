import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
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

      <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginBottom: '1rem', color: '#374151' }}>Donation Impact Progress</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={[
              { name: 'Total Donations', count: stats.total },
              { name: 'Pending', count: stats.pending },
              { name: 'Picked Up', count: stats.picked },
              { name: 'Delivered', count: stats.delivered },
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DonorLayout>
  );
};

export default DonorDashboard;
