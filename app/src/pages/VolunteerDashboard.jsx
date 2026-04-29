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
      <h2>Volunteer Dashboard</h2>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card p-3 text-center bg-info text-white shadow-sm">
            <h3>{stats.pending}</h3>
            <p>Pending Pickups</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 text-center bg-success text-white shadow-sm">
            <h3>{stats.delivered}</h3>
            <p>Successful Deliveries</p>
          </div>
        </div>
      </div>
    </VolunteerLayout>
  );
};

export default VolunteerDashboard;
