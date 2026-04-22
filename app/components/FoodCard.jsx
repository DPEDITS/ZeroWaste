import React from 'react';

function FoodCard({ food, onClaim, onUploadProof }) {
  const statusColors = {
    available: { bg: '#e8f5e9', text: '#2e7d32', label: 'Available' },
    claimed: { bg: '#fff3e0', text: '#e65100', label: 'Claimed by you' },
    completed: { bg: '#e3f2fd', text: '#1565c0', label: 'Completed' },
  };

  const status = statusColors[food.status];

  return (
    <div className="ff-food-card">
      <div className="ff-food-card-header">
        <div className="ff-food-icon">🍱</div>
        <div className="ff-food-meta">
          <h3 className="ff-food-title">{food.foodType}</h3>
          <p className="ff-food-donor">by {food.donor}</p>
        </div>
        <span className="ff-food-status" style={{ background: status.bg, color: status.text }}>
          {status.label}
        </span>
      </div>

      <div className="ff-food-details">
        <div className="ff-food-detail">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>{food.location}</span>
        </div>
        <div className="ff-food-detail">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>Expires in {food.expiresIn}</span>
        </div>
        <div className="ff-food-detail">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
          <span>{food.quantity}</span>
        </div>
        <div className="ff-food-detail">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="2"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
          <span>{food.distance} away</span>
        </div>
      </div>

      <div className="ff-food-actions">
        {food.status === 'available' && (
          <button className="ff-btn ff-btn-primary" onClick={() => onClaim(food.id)}>
            🤝 Claim This Food
          </button>
        )}
        {food.status === 'claimed' && (
          <button className="ff-btn ff-btn-success" onClick={() => onUploadProof(food.id)}>
            📸 Upload Distribution Proof
          </button>
        )}
        {food.status === 'completed' && food.proofImage && (
          <div className="ff-proof-preview">
            <img src={food.proofImage} alt="Distribution proof" className="ff-proof-img" />
            <p className="ff-proof-label">✅ Proof submitted to donor</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FoodCard;
