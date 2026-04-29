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
      // Sort newest first
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Donations</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Donate Food"}
        </button>
      </div>

      {showForm && (
        <div className="card p-4 mb-4 shadow-sm border-0 bg-light">
          <h4>Add New Food Donation</h4>
          <form onSubmit={handleAddDonation}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Food Item</label>
                <input type="text" className="form-control" required value={form.foodItem} onChange={e => setForm({...form, foodItem: e.target.value})} placeholder="e.g., Cooked Rice & Dal" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Quantity</label>
                <input type="text" className="form-control" required value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} placeholder="e.g., ~50 servings" />
              </div>
              <div className="col-md-12 mb-3">
                <label className="form-label">Pickup Address</label>
                <input type="text" className="form-control" required value={form.donorAddress} onChange={e => setForm({...form, donorAddress: e.target.value})} placeholder="e.g., 123 Main St, City" />
              </div>
            </div>
            <button type="submit" className="btn btn-success">Post Donation</button>
          </form>
        </div>
      )}

      <div className="row">
        {donations.length === 0 ? (
          <p className="ms-3">You haven't posted any donations yet.</p>
        ) : (
          donations.map((donation) => (
            <div key={donation._id} className="col-md-6 mb-4">
              <div className="card p-3 shadow-sm h-100 border-0">
                <div className="d-flex justify-content-between">
                  <h5 className="mb-1 text-primary">{donation.foodItem}</h5>
                  <span className={`badge ${donation.status === "delivered" ? "bg-success" : donation.status === "picked" ? "bg-info" : "bg-warning"}`}>
                    {donation.status.toUpperCase()}
                  </span>
                </div>
                <p className="mb-1 mt-2 text-muted"><strong>Quantity:</strong> {donation.quantity}</p>
                <p className="mb-1 text-muted"><strong>Address:</strong> {donation.donorAddress}</p>
                
                {donation.volunteer && (
                  <div className="mt-3 p-2 bg-light rounded">
                    <small className="d-block mb-1"><strong>Volunteer:</strong> {donation.volunteer.name}</small>
                    {donation.status === "delivered" && donation.proofImage && (
                      <div className="mt-2">
                        <small className="d-block text-success mb-1">✓ Proof of delivery uploaded</small>
                        <img 
                          src={`http://localhost:5000/uploads/${donation.proofImage}`} 
                          alt="Delivery Proof" 
                          className="img-fluid rounded" 
                          style={{ maxHeight: "150px", objectFit: "cover" }} 
                        />
                      </div>
                    )}
                  </div>
                )}
                <small className="text-muted mt-auto pt-2 d-block text-end">Posted {new Date(donation.createdAt).toLocaleDateString()}</small>
              </div>
            </div>
          ))
        )}
      </div>
    </DonorLayout>
  );
};

export default DonorDonations;
