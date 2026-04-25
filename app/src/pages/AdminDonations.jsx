import AdminLayout from "../components/AdminLayout";

const AdminDonations = () => {
  return (
    <AdminLayout>
      <h2>Donations</h2>

      <div className="card p-3 mt-3">
        <p>Food: Biryani</p>
        <p>Donor: Rahul</p>
        <span className="badge bg-warning">Pending</span>
      </div>

    </AdminLayout>
  );
};

export default AdminDonations;