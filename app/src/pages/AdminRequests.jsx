import AdminLayout from "../components/AdminLayout";

const AdminRequests = () => {
  return (
    <AdminLayout>
      <h2>Requests</h2>

      <div className="card p-3 mt-3">
        <p>Requester: NGO</p>
        <button className="btn btn-primary">Assign Volunteer</button>
      </div>

    </AdminLayout>
  );
};

export default AdminRequests;