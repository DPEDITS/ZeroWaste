import AdminLayout from "../components/AdminLayout";

const AdminDashboard = () => {
  return (
    <AdminLayout>

      <h2>Dashboard Overview</h2>

      <div className="row mt-4">

        <div className="col-md-3">
          <div className="card p-3 text-center">
            <h3>120</h3>
            <p>Total Users</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 text-center">
            <h3>80</h3>
            <p>Donations</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 text-center">
            <h3>45</h3>
            <p>Volunteers</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 text-center">
            <h3>60</h3>
            <p>Delivered</p>
          </div>
        </div>

      </div>

    </AdminLayout>
  );
};

export default AdminDashboard;