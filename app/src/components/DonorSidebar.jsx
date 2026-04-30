import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/donor.css";

const DonorSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="donor-sidebar">

      {/* Header */}
      <div className="sidebar-header">
        <Link to="/" className="sidebar-logo">
          <div className="sidebar-logo-icon">♻️</div>
          <span className="sidebar-logo-text">ZeroWaste</span>
        </Link>

        <div className="sidebar-user">
          <div className="sidebar-avatar">
            {user?.name?.[0]?.toUpperCase() || "D"}
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{user?.name || "Donor"}</div>
            <div className="sidebar-user-role">Food Donor</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="sidebar-nav-label">Main Menu</div>

        <Link
          to="/donor/dashboard"
          className={`sidebar-link ${isActive("/donor/dashboard") ? "active" : ""}`}
        >
          <span className="sidebar-link-icon">📊</span>
          Dashboard
        </Link>

        <Link
          to="/donor/donations"
          className={`sidebar-link ${isActive("/donor/donations") ? "active" : ""}`}
        >
          <span className="sidebar-link-icon">🍽️</span>
          My Donations
        </Link>

        <Link
          to="/donor/notifications"
          className={`sidebar-link ${isActive("/donor/notifications") ? "active" : ""}`}
        >
          <span className="sidebar-link-icon">🔔</span>
          Notifications
        </Link>

        <div className="sidebar-nav-label">Quick Actions</div>

        <Link
          to="/donor/donations"
          className="sidebar-link"
        >
          <span className="sidebar-link-icon">➕</span>
          Donate Food
        </Link>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <button className="sidebar-logout" onClick={logout}>
          🚪 Sign Out
        </button>
      </div>

    </aside>
  );
};

export default DonorSidebar;
