import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
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

      <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginBottom: '1rem', color: '#374151' }}>My Progress</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={[
              { name: 'Pending Pickups', count: stats.pending },
              { name: 'My Deliveries', count: stats.delivered },
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </VolunteerLayout>
  );
};

export default VolunteerDashboard;
