import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import axios from "axios";

const AdminDonations = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/donations/all");
        setDonations(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDonations();
  }, []);

  return (
    <AdminLayout>
      <div className="admin-action-bar">
        <div>
          <h1 className="admin-page-title">Donations Management</h1>
          <p className="admin-page-subtitle">Monitor all food donations across the platform</p>
        </div>
      </div>

      <div className="mt-4">
        {donations.length === 0 ? (
          <div className="admin-empty-state">
            <div className="empty-icon">🍱</div>
            <div className="empty-title">No donations available</div>
            <div className="empty-desc">There are currently no donations on the platform.</div>
          </div>
        ) : (
          <div className="donations-grid">
            {donations.map((donation) => (
              <div key={donation._id} className="donation-card">
                <div className="donation-card-header">
                  <div className="donation-card-food">
                    <div className="food-icon-box" style={{background: '#f3f4f6'}}>🍱</div>
                    <div>
                      <h5 className="food-title">{donation.foodItem}</h5>
                      <div className="food-date">Donor: {donation.donorName}</div>
                    </div>
                  </div>
                  <span className={`donation-status-badge badge-${donation.status}`}>
                    {donation.status}
                  </span>
                </div>
                
                <div className="donation-details">
                  <div className="detail-pill">
                    <span className="detail-pill-icon">⚖️</span>
                    {donation.quantity}
                  </div>
                  <div className="detail-pill">
                    <span className="detail-pill-icon">📍</span>
                    {donation.donorAddress}
                  </div>
                </div>

                {donation.volunteer && (
                  <div className="volunteer-info mt-auto" style={{background: '#f8fafc', borderColor: '#e2e8f0'}}>
                    <div className="volunteer-info-header">
                      <span className="volunteer-check">👤</span>
                      <span className="volunteer-name">Volunteer: {donation.volunteer.name}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDonations;