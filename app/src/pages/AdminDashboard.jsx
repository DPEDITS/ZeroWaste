import { useState, useEffect } from "react";
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
    </AdminLayout>
  );
};

export default AdminDashboard;