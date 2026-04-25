import { Link, useNavigate } from "react-router-dom";

const VolunteerSidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className="bg-dark text-white p-3 vh-100" style={{ width: "250px" }}>
      <h4>Volunteer Panel</h4>

      <ul className="nav flex-column mt-4">
        <li><Link to="/volunteer/dashboard" className="nav-link text-white">Dashboard</Link></li>
        <li><Link to="/volunteer/donations" className="nav-link text-white">Food Pickup</Link></li>
        <li><Link to="/volunteer/my-deliveries" className="nav-link text-white">My Deliveries</Link></li>
      </ul>

      <button className="btn btn-danger w-100 mt-5" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default VolunteerSidebar;
