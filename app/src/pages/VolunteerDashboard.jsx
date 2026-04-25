import VolunteerLayout from "../components/VolunteerLayout";

const VolunteerDashboard = () => {
  return (
    <VolunteerLayout>
      <h2>Volunteer Dashboard</h2>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card p-3 text-center bg-info text-white">
            <h3>5</h3>
            <p>Pending Pickups</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 text-center bg-success text-white">
            <h3>12</h3>
            <p>Successful Deliveries</p>
          </div>
        </div>
      </div>
    </VolunteerLayout>
  );
};

export default VolunteerDashboard;
