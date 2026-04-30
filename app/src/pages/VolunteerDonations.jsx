import { useState, useEffect } from "react";
import VolunteerLayout from "../components/VolunteerLayout";
import axios from "axios";

const VolunteerDonations = () => {
  const [donations, setDonations] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/donations/all");
      setDonations(res.data.filter(d => d.status !== "delivered"));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAccept = async (donationId) => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    try {
      await axios.put("http://localhost:5000/api/donations/assign", {
        donationId,
        volunteerId: userId,
      });
      alert("Pickup accepted!");
      fetchDonations();
    } catch (err) {
      alert("Failed to accept pickup!");
      console.error(err);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (donationId) => {
    if (!file) return alert("Please select an image first!");

    const formData = new FormData();
    formData.append("proofImage", file);

    try {
      await axios.put(`http://localhost:5000/api/donations/upload-proof/${donationId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Proof uploaded successfully!");
      setFile(null);
      fetchDonations();
    } catch (err) {
      alert("Upload failed!");
      console.error(err);
    }
  };

  return (
    <VolunteerLayout>
      <div className="vol-action-bar">
        <div>
          <h1 className="vol-page-title">Assigned Pickups</h1>
          <p className="vol-page-subtitle">View available food donations and manage your active deliveries</p>
        </div>
      </div>

      <div className="donations-grid">
        {donations.length === 0 ? (
          <div className="vol-empty-state">
            <div className="empty-icon">🍽️</div>
            <div className="empty-title">No donations available</div>
            <div className="empty-desc">Check back later for new food pickup opportunities.</div>
          </div>
        ) : (
          donations.map((donation) => (
            <div key={donation._id} className="donation-card">
              <div className="donation-card-header">
                <div className="donation-card-food">
                  <div className="food-icon-box">🍱</div>
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

              <div className="volunteer-info" style={{background: 'transparent', border: 'none', padding: 0}}>
                  {donation.status === "pending" ? (
                    <button className="btn-add-donation w-100 justify-content-center" onClick={() => handleAccept(donation._id)}>🤝 Accept Pickup</button>
                  ) : (
                    <div className="mt-3">
                      <input
                        type="file"
                        className="vol-form-input mb-2 p-2"
                        onChange={handleFileChange}
                      />
                      <button
                        className="btn-add-donation w-100 justify-content-center"
                        style={{background: 'linear-gradient(135deg, #2563eb, #1d4ed8)'}}
                        onClick={() => handleUpload(donation._id)}
                      >
                        ✅ Upload Proof & Complete
                      </button>
                    </div>
                  )}
              </div>
            </div>
          ))
        )}
      </div>
    </VolunteerLayout>
  );
};

export default VolunteerDonations;
