import { useState, useEffect } from "react";
import VolunteerLayout from "../components/VolunteerLayout";
import axios from "axios";

const MyDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.get("http://localhost:5000/api/donations/all");
      // Filter for this volunteer and 'delivered' status
      const myData = res.data.filter(d => d.volunteer && d.volunteer._id === user._id && d.status === "delivered");
      setDeliveries(myData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <VolunteerLayout>
      <div className="vol-action-bar">
        <div>
          <h1 className="vol-page-title">My Successful Deliveries</h1>
          <p className="vol-page-subtitle">A record of your impactful contributions</p>
        </div>
      </div>

      <div className="mt-4">
        {deliveries.length === 0 ? (
          <div className="vol-empty-state">
            <div className="empty-icon">🚚</div>
            <div className="empty-title">No completed deliveries yet</div>
            <div className="empty-desc">Once you complete a pickup, it will show up here.</div>
          </div>
        ) : (
          <div className="donations-grid">
            {deliveries.map((delivery) => (
              <div key={delivery._id} className="donation-card" style={{padding: 0, overflow: 'hidden'}}>
                <img
                  src={`http://localhost:5000/uploads/${delivery.proofImage}`}
                  alt="Proof of Delivery"
                  style={{ height: "200px", objectFit: "cover", width: '100%' }}
                />
                <div style={{padding: '20px'}}>
                  <div className="donation-card-header mb-2">
                    <h5 className="food-title m-0">{delivery.foodItem}</h5>
                    <span className="donation-status-badge badge-delivered">Delivered</span>
                  </div>
                  <p className="food-date mb-2">Donor: {delivery.donorName}</p>
                  <p className="food-date mb-0">Address: {delivery.donorAddress}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </VolunteerLayout>
  );
};

export default MyDeliveries;
