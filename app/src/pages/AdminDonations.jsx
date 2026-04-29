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
      <h2>Donations Management</h2>
      <div className="mt-4">
        {donations.length === 0 ? (
          <p>No donations available.</p>
        ) : (
          <div className="row">
            {donations.map((donation) => (
              <div key={donation._id} className="col-md-4 mb-4">
                <div className="card p-3 shadow-sm h-100">
                  <h5>{donation.foodItem}</h5>
                  <p className="mb-1 text-muted">Quantity: {donation.quantity}</p>
                  <p className="mb-1">Donor: {donation.donorName}</p>
                  <p className="mb-1">Address: {donation.donorAddress}</p>
                  <div className="mt-auto pt-3">
                    <span className={`badge ${donation.status === "delivered" ? "bg-success" : donation.status === "picked" ? "bg-info" : "bg-warning"}`}>
                      {donation.status.toUpperCase()}
                    </span>
                    {donation.volunteer && (
                      <p className="mt-2 mb-0 small text-muted">Volunteer: {donation.volunteer.name}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDonations;