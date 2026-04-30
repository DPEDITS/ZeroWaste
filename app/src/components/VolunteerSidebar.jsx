import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/volunteer.css";

const VolunteerSidebar = () => {
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
    <aside className="vol-sidebar">

      {/* Header */}
      <div className="sidebar-header">
        <Link to="/volunteer/dashboard" className="sidebar-logo">
          <div className="sidebar-logo-icon">♻️</div>
          <span className="sidebar-logo-text">ZeroWaste</span>
        </Link>
        <div className="sidebar-user">
          <div className="sidebar-avatar">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{user?.name}</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="sidebar-nav-label">Main Menu</div>

        <Link
          to="/volunteer/dashboard"
          className={`sidebar-link ${isActive("/volunteer/dashboard") ? "active" : ""}`}
        >
          <span className="sidebar-link-icon">📊</span>
          Dashboard
        </Link>

        <Link
          to="/volunteer/donations"
          className={`sidebar-link ${isActive("/volunteer/donations") ? "active" : ""}`}
        >
          <span className="sidebar-link-icon">🍱</span>
          Assigned Pickups
        </Link>

        <Link
          to="/volunteer/my-deliveries"
          className={`sidebar-link ${isActive("/volunteer/my-deliveries") ? "active" : ""}`}
        >
          <span className="sidebar-link-icon">🚚</span>
          My Deliveries
        </Link>

        <Link
          to="/volunteer/notifications"
          className={`sidebar-link ${isActive("/volunteer/notifications") ? "active" : ""}`}
        >
          <span className="sidebar-link-icon">🔔</span>
          Notifications
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

export default VolunteerSidebar;
