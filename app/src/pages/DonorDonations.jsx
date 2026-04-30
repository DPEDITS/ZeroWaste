import { useState, useEffect } from "react";
import DonorLayout from "../components/DonorLayout";
import axios from "axios";

const DonorDonations = () => {
  const [donations, setDonations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ foodItem: "", quantity: "", donorAddress: "" });

  const fetchDonations = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;
      const res = await axios.get("http://localhost:5000/api/donations/all");
      const myDonations = res.data.filter(d => d.donorName === user.name);
      setDonations(myDonations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleAddDonation = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await axios.post("http://localhost:5000/api/donations/create", {
        foodItem: form.foodItem,
        quantity: form.quantity,
        donorName: user.name,
        donorAddress: form.donorAddress,
      });
      alert("Donation posted successfully!");
      setForm({ foodItem: "", quantity: "", donorAddress: "" });
      setShowForm(false);
      fetchDonations();
    } catch (err) {
      alert("Failed to post donation");
      console.error(err);
    }
  };

  return (
    <DonorLayout>
      <div className="donor-action-bar">
        <div>
          <h1 className="donor-page-title">My Donations</h1>
          <p className="donor-page-subtitle">Manage your food donations and track their distribution</p>
        </div>
        <button 
          className={showForm ? "btn-cancel" : "btn-add-donation"} 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "✕ Cancel" : "➕ Donate Food"}
        </button>
      </div>

      {showForm && (
        <div className="donation-form-card">
          <div className="form-card-title">
            <span>🍱</span> Add New Food Donation
          </div>
          <form onSubmit={handleAddDonation}>
            <div className="form-grid">
              <div className="donor-form-group">
                <label className="donor-form-label">Food Item</label>
                <input 
                  type="text" 
                  className="donor-form-input" 
                  required 
                  value={form.foodItem} 
                  onChange={e => setForm({ ...form, foodItem: e.target.value })} 
                  placeholder="e.g., Cooked Rice & Dal" 
                />
              </div>
              <div className="donor-form-group">
                <label className="donor-form-label">Quantity</label>
                <input 
                  type="text" 
                  className="donor-form-input" 
                  required 
                  value={form.quantity} 
                  onChange={e => setForm({ ...form, quantity: e.target.value })} 
                  placeholder="e.g., ~50 servings" 
                />
              </div>
            </div>
            <div className="form-grid full-width">
              <div className="donor-form-group">
                <label className="donor-form-label">Pickup Address</label>
                <input 
                  type="text" 
                  className="donor-form-input" 
                  required 
                  value={form.donorAddress} 
                  onChange={e => setForm({ ...form, donorAddress: e.target.value })} 
                  placeholder="e.g., 123 Main St, City" 
                />
              </div>
            </div>
            <button type="submit" className="btn-post-donation">
              ✅ Post Donation
            </button>
          </form>
        </div>
      )}

      {donations.length === 0 && !showForm ? (
        <div className="donor-empty-state">
          <div className="empty-icon">🍽️</div>
          <div className="empty-title">No donations yet</div>
          <div className="empty-desc">Click "Donate Food" to start making an impact in your community.</div>
        </div>
      ) : (
        <div className="donations-grid">
          {donations.map((donation) => (
            <div key={donation._id} className="donation-card">
              <div className="donation-card-header">
                <div className="donation-card-food">
                  <div className="food-icon-box">🍱</div>
                  <div>
                    <h5 className="food-title">{donation.foodItem}</h5>
                    <div className="food-date">Posted {new Date(donation.createdAt).toLocaleDateString()}</div>
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
                <div className="volunteer-info">
                  <div className="volunteer-info-header">
                    <span className="volunteer-check">✓</span>
                    <span className="volunteer-name">Volunteer: {donation.volunteer.name}</span>
                  </div>
                  {donation.status === "delivered" && donation.proofImage && (
                    <div>
                      <div className="proof-label">✓ Proof of delivery uploaded</div>
                      <img
                        src={`http://localhost:5000/uploads/${donation.proofImage}`}
                        alt="Delivery Proof"
                        className="proof-image"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </DonorLayout>
  );
};

export default DonorDonations;
