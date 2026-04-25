import React, { useState } from 'react';
import FoodCard from './FoodCard.jsx';
import ProofUpload from './ProofUpload.jsx';

const MOCK_FOOD = [
  {
    id: 1,
    foodType: "Cooked Rice & Dal",
    quantity: "~50 servings",
    donor: "Hotel Mayfair",
    location: "Bhubaneswar, Saheed Nagar",
    distance: "2.3 km",
    expiresIn: "4 hours",
    status: "available",
    proofImage: null,
  },
  {
    id: 2,
    foodType: "Fresh Bread & Pastries",
    quantity: "~30 packs",
    donor: "Bakery Bliss",
    location: "Cuttack, College Square",
    distance: "5.1 km",
    expiresIn: "6 hours",
    status: "available",
    proofImage: null,
  },
  {
    id: 3,
    foodType: "Vegetable Biryani",
    quantity: "~80 plates",
    donor: "Wedding Hall - Shanti Niwas",
    location: "Bhubaneswar, Patia",
    distance: "1.8 km",
    expiresIn: "2 hours",
    status: "available",
    proofImage: null,
  },
  {
    id: 4,
    foodType: "Fruit Salad & Juice",
    quantity: "~40 cups",
    donor: "Juice Corner",
    location: "Bhubaneswar, Jaydev Vihar",
    distance: "3.5 km",
    expiresIn: "3 hours",
    status: "available",
    proofImage: null,
  },
];

function Dashboard({ user, onLogout }) {
  const [foods, setFoods] = useState(MOCK_FOOD);
  const [uploadingFor, setUploadingFor] = useState(null);
  const [filter, setFilter] = useState('all');

  const handleClaim = (id) => {
    setFoods(prev =>
      prev.map(f => f.id === id ? { ...f, status: 'claimed' } : f)
    );
  };

  const handleProofSubmit = (id, imageUrl) => {
    setFoods(prev =>
      prev.map(f => f.id === id ? { ...f, status: 'completed', proofImage: imageUrl } : f)
    );
    setUploadingFor(null);
  };

  const filteredFoods = filter === 'all' ? foods : foods.filter(f => f.status === filter);

  const stats = {
    available: foods.filter(f => f.status === 'available').length,
    claimed: foods.filter(f => f.status === 'claimed').length,
    completed: foods.filter(f => f.status === 'completed').length,
  };

  return (
    <div className="ff-dashboard">
      {/* Header */}
      <div className="ff-dash-header">
        <div>
          <h1 className="ff-dash-title">🍽️ Nearby Food Available</h1>
          <p className="ff-dash-subtitle">Claim food before it expires and distribute to those in need</p>
        </div>
        <div className="ff-dash-user">
          <div className="ff-dash-avatar">{user?.name?.[0] || 'N'}</div>
          <div>
            <p className="ff-dash-username">{user?.name || 'NGO User'}</p>
            <button className="ff-dash-logout" onClick={onLogout}>Logout</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="ff-stats-row">
        <div className="ff-stat-card ff-stat-green">
          <span className="ff-stat-number">{stats.available}</span>
          <span className="ff-stat-label">Available</span>
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

      {/* Filter Tabs */}
      <div className="ff-filter-bar">
        <div className="ff-segmented-control">
          {['all', 'available', 'claimed', 'completed'].map((f) => (
            <button
              key={f}
              className={`ff-segment ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Food Grid */}
      <div className="ff-food-grid">
        {filteredFoods.length > 0 ? (
          filteredFoods.map(food => (
            <FoodCard
              key={food.id}
              food={food}
              onClaim={handleClaim}
              onUploadProof={(id) => setUploadingFor(id)}
            />
          ))
        ) : (
          <div className="ff-empty-state">
            <p>No food listings found for this filter.</p>
          </div>
        )}
      </div>

      {/* Proof Upload Modal */}
      {uploadingFor && (
        <ProofUpload
          foodId={uploadingFor}
          onSubmit={handleProofSubmit}
          onClose={() => setUploadingFor(null)}
        />
      )}
    </div>
  );
}

export default Dashboard;
