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
      <h2>My Successful Deliveries</h2>
      <div className="mt-4">
        {deliveries.length === 0 ? (
          <p>You haven't completed any deliveries yet.</p>
        ) : (
          <div className="row">
            {deliveries.map((delivery) => (
              <div key={delivery._id} className="col-md-6 mb-4">
                <div className="card shadow-sm h-100">
                  <img 
                    src={`http://localhost:5000/uploads/${delivery.proofImage}`} 
                    className="card-img-top" 
                    alt="Proof of Delivery" 
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{delivery.foodItem}</h5>
                    <p className="card-text text-muted">
                      Delivered to the poor. <br/>
                      Donor: {delivery.donorName} <br/>
                      Address: {delivery.donorAddress}
                    </p>
                    <span className="badge bg-success">Delivered</span>
                  </div>
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
