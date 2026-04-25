import { Link, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("role");
    navigate("/admin/login");
  };

  return (
    <div className="bg-dark text-white p-3 vh-100" style={{ width: "250px" }}>
      <h4>Admin Panel</h4>

      <ul className="nav flex-column mt-4">
        <li><Link to="/admin/dashboard" className="nav-link text-white">Dashboard</Link></li>
        <li><Link to="/admin/users" className="nav-link text-white">Users</Link></li>
        <li><Link to="/admin/donations" className="nav-link text-white">Donations</Link></li>
        <li><Link to="/admin/requests" className="nav-link text-white">Requests</Link></li>
      </ul>

      <button className="btn btn-danger w-100 mt-5" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default AdminSidebar;