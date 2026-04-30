import React, { useState } from 'react';

const MOCK_DONATIONS = [
  {
    id: 1,
    foodType: "Cooked Rice & Dal",
    quantity: "~50 servings",
    location: "Bhubaneswar, Saheed Nagar",
    expiresIn: "4 hours",
    status: "available",
    claimedBy: null,
    proofImage: null,
    createdAt: "2 hours ago",
  },
  {
    id: 2,
    foodType: "Fresh Bread & Pastries",
    quantity: "~30 packs",
    location: "Cuttack, College Square",
    expiresIn: "6 hours",
    status: "claimed",
    claimedBy: "Fularani Foundation",
    proofImage: null,
    createdAt: "5 hours ago",
  },
];

function DonorDashboard({ user, onLogout }) {
  const [donations, setDonations] = useState(MOCK_DONATIONS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ foodType: '', quantity: '', location: '', expiresIn: '' });

  const handleAddDonation = () => {
    if (!form.foodType || !form.quantity || !form.location || !form.expiresIn) return;
    const newDonation = {
      id: Date.now(),
      ...form,
      status: 'available',
      claimedBy: null,
      proofImage: null,
      createdAt: 'Just now',
    };
    setDonations([newDonation, ...donations]);
    setForm({ foodType: '', quantity: '', location: '', expiresIn: '' });
    setShowForm(false);
  };

  const stats = {
    total: donations.length,
    available: donations.filter(d => d.status === 'available').length,
    claimed: donations.filter(d => d.status === 'claimed').length,
    completed: donations.filter(d => d.status === 'completed').length,
  };

  return (
    <div className="ff-dashboard">
      {/* Header */}
      <div className="ff-dash-header">
        <div>
          <h1 className="ff-dash-title">🍽️ Donor Dashboard</h1>
          <p className="ff-dash-subtitle">Manage your food donations and track their distribution</p>
        </div>
        <div className="ff-dash-user">
          <div className="ff-dash-avatar" style={{ background: 'linear-gradient(135deg, #ff9500, #ff3b30)' }}>
            {user?.name?.[0] || 'D'}
          </div>
          <div>
            <p className="ff-dash-username">{user?.name || 'Donor'}</p>
            <button className="ff-dash-logout" onClick={onLogout}>Logout</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="ff-stats-row">
        <div className="ff-stat-card" style={{ background: '#f3e8ff' }}>
          <span className="ff-stat-number">{stats.total}</span>
          <span className="ff-stat-label">Total Donations</span>
        </div>
        <div className="ff-stat-card ff-stat-green">
          <span className="ff-stat-number">{stats.available}</span>
          <span className="ff-stat-label">Awaiting Pickup</span>
        </div>
        <div className="ff-stat-card ff-stat-orange">
          <span className="ff-stat-number">{stats.claimed}</span>
          <span className="ff-stat-label">Claimed</span>
        </div>
        <div className="ff-stat-card ff-stat-blue">
          <span className="ff-stat-number">{stats.completed}</span>
          <span className="ff-stat-label">Distributed</span>
        </div>
      </div>

      {/* Add Donation Button */}
      <div style={{ marginBottom: '24px' }}>
        <button className="ff-btn ff-btn-primary" style={{ maxWidth: '280px' }} onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '＋ Donate Food'}
        </button>
      </div>

      {/* Add Food Form */}
      {showForm && (
        <div className="ff-card ff-animate-in" style={{ marginBottom: '28px', padding: '28px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1d1d1f', marginBottom: '20px' }}>
            Add New Food Donation
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="ff-form-group">
              <label className="ff-label">Food Type</label>
              <input className="ff-input" placeholder="e.g. Cooked Rice & Dal" value={form.foodType}
                onChange={e => setForm({ ...form, foodType: e.target.value })} />
            </div>
            <div className="ff-form-group">
              <label className="ff-label">Quantity</label>
              <input className="ff-input" placeholder="e.g. ~50 servings" value={form.quantity}
                onChange={e => setForm({ ...form, quantity: e.target.value })} />
            </div>
            <div className="ff-form-group">
              <label className="ff-label">Pickup Location</label>
              <input className="ff-input" placeholder="e.g. Bhubaneswar, Saheed Nagar" value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })} />
            </div>
            <div className="ff-form-group">
              <label className="ff-label">Available For</label>
              <input className="ff-input" placeholder="e.g. 4 hours" value={form.expiresIn}
                onChange={e => setForm({ ...form, expiresIn: e.target.value })} />
            </div>
          </div>
          <button className="ff-btn ff-btn-success" style={{ maxWidth: '200px', marginTop: '8px' }} onClick={handleAddDonation}>
            ✅ Post Donation
          </button>
        </div>
      )}

      {/* Donations List */}
      <div className="ff-food-grid">
        {donations.map(donation => (
          <div key={donation.id} className="ff-food-card">
            <div className="ff-food-card-header">
              <div className="ff-food-icon">🍱</div>
              <div className="ff-food-meta">
                <h3 className="ff-food-title">{donation.foodType}</h3>
                <p className="ff-food-donor">Posted {donation.createdAt}</p>
              </div>
              <span className="ff-food-status" style={{
                background: donation.status === 'available' ? '#e8f5e9' : donation.status === 'claimed' ? '#fff3e0' : '#e3f2fd',
                color: donation.status === 'available' ? '#2e7d32' : donation.status === 'claimed' ? '#e65100' : '#1565c0',
              }}>
                {donation.status === 'available' ? 'Awaiting Pickup' : donation.status === 'claimed' ? 'Claimed' : 'Distributed'}
              </span>
            </div>

            <div className="ff-food-details">
              <div className="ff-food-detail">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>{donation.location}</span>
              </div>
              <div className="ff-food-detail">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>{donation.expiresIn}</span>
              </div>
              <div className="ff-food-detail">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                <span>{donation.quantity}</span>
              </div>
            </div>

            {/* Claimed Info */}
            {donation.claimedBy && (
              <div className="ff-claimed-info">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <span>Claimed by <strong>{donation.claimedBy}</strong></span>
              </div>
            )}

            {/* Proof Image */}
            {donation.status === 'completed' && donation.proofImage && (
              <div className="ff-proof-preview">
                <img src={donation.proofImage} alt="Distribution proof" className="ff-proof-img" />
                <p className="ff-proof-label">✅ Distribution verified</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DonorDashboard;
