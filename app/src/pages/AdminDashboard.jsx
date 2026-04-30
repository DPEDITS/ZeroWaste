import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import AdminLayout from "../components/AdminLayout";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, donations: 0, volunteers: 0, delivered: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersRes = await axios.get("http://localhost:5000/api/users/all");
        const donationsRes = await axios.get("http://localhost:5000/api/donations/all");
        
        const users = usersRes.data.users || [];
        const donations = donationsRes.data || [];

        setStats({
          users: users.length,
          donations: donations.length,
          volunteers: users.filter(u => u.role === "volunteer").length,
          delivered: donations.filter(d => d.status === "delivered").length,
        });
      } catch (err) {
        console.error("Error fetching stats", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard Overview</h1>
        <p className="admin-page-subtitle">Monitor platform metrics and activity</p>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card total">
          <div className="stat-card-icon total">👥</div>
          <div className="stat-card-number">{stats.users}</div>
          <div className="stat-card-label">Total Users</div>
        </div>

        <div className="admin-stat-card pending">
          <div className="stat-card-icon pending">🍱</div>
          <div className="stat-card-number">{stats.donations}</div>
          <div className="stat-card-label">Total Donations</div>
        </div>

        <div className="admin-stat-card picked">
          <div className="stat-card-icon picked">🚚</div>
          <div className="stat-card-number">{stats.volunteers}</div>
          <div className="stat-card-label">Active Volunteers</div>
        </div>

        <div className="admin-stat-card delivered">
          <div className="stat-card-icon delivered">✅</div>
          <div className="stat-card-number">{stats.delivered}</div>
          <div className="stat-card-label">Successful Deliveries</div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginBottom: '1rem', color: '#374151' }}>System Progress</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={[
              { name: 'Total Users', count: stats.users },
              { name: 'Volunteers', count: stats.volunteers },
              { name: 'Donations', count: stats.donations },
              { name: 'Delivered', count: stats.delivered },
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;