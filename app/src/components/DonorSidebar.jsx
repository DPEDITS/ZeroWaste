import { Link, useNavigate } from "react-router-dom";

const DonorSidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="bg-dark text-white p-3 vh-100" style={{ width: "250px" }}>
      <h4>Donor Panel</h4>

      <ul className="nav flex-column mt-4">
        <li><Link to="/donor/dashboard" className="nav-link text-white">Dashboard</Link></li>
        <li><Link to="/donor/donations" className="nav-link text-white">My Donations</Link></li>
      </ul>

      <button className="btn btn-danger w-100 mt-5" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default DonorSidebar;
