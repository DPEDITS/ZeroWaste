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
      <h2>Dashboard Overview</h2>
      <div className="row mt-4">
        <div className="col-md-3">
          <div className="card p-3 text-center shadow-sm">
            <h3>{stats.users}</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3 text-center shadow-sm">
            <h3>{stats.donations}</h3>
            <p>Total Donations</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3 text-center shadow-sm">
            <h3>{stats.volunteers}</h3>
            <p>Volunteers</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3 text-center shadow-sm">
            <h3>{stats.delivered}</h3>
            <p>Delivered</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;