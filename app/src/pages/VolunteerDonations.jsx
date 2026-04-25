import { useState, useEffect } from "react";
import VolunteerLayout from "../components/VolunteerLayout";
import axios from "axios";

const VolunteerDonations = () => {
  const [donations, setDonations] = useState([]);
  const [file, setFile] = useState(null);
  const [uploadingId, setUploadingId] = useState(null);

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
      setUploadingId(null);
      fetchDonations();
    } catch (err) {
      alert("Upload failed!");
      console.error(err);
    }
  };

  return (
    <VolunteerLayout>
      <h2>Assigned Food Pickups</h2>
      <div className="mt-4">
        {donations.length === 0 ? (
          <p>No donations available for pickup.</p>
        ) : (
          donations.map((donation) => (
            <div key={donation._id} className="card p-3 mb-3 shadow-sm">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{donation.foodItem}</h5>
                  <p className="mb-1 text-muted">Quantity: {donation.quantity}</p>
                  <p className="mb-1 text-muted">Donor: {donation.donorName}</p>
                  <p className="mb-0 text-muted">Address: {donation.donorAddress}</p>
                  <span className={`badge mt-2 ${donation.status === "pending" ? "bg-warning" : "bg-primary"}`}>
                    {donation.status.toUpperCase()}
                  </span>
                </div>
                <div>
                  {donation.status === "pending" ? (
                    <button className="btn btn-primary" onClick={() => handleAccept(donation._id)}>Accept Pickup</button>
                  ) : (
                    <div className="text-end">
                      <input 
                        type="file" 
                        className="form-control form-control-sm mb-2" 
                        onChange={handleFileChange}
                      />
                      <button 
                        className="btn btn-success btn-sm"
                        onClick={() => handleUpload(donation._id)}
                      >
                        Upload Proof & Complete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </VolunteerLayout>
  );
};

export default VolunteerDonations;
