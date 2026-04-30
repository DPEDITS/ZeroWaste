import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/admin.css";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <Link to="/admin/dashboard" className="sidebar-logo">
          <div className="sidebar-logo-icon">♻️</div>
          <span className="sidebar-logo-text">ZeroWaste</span>
        </Link>
      </div>
      <nav className="sidebar-nav">
        <div className="sidebar-nav-label">Main Menu</div>

        <Link
          to="/admin/dashboard"
          className={`sidebar-link ${isActive("/admin/dashboard") ? "active" : ""}`}
        >
          <span className="sidebar-link-icon">📊</span>
          Overview
        </Link>

        <Link
          to="/admin/users"
          className={`sidebar-link ${isActive("/admin/users") ? "active" : ""}`}
        >
          <span className="sidebar-link-icon">👥</span>
          Users
        </Link>

        <Link
          to="/admin/donations"
          className={`sidebar-link ${isActive("/admin/donations") ? "active" : ""}`}
        >
          <span className="sidebar-link-icon">🍱</span>
          Donations
        </Link>

        <Link
          to="/admin/notifications"
          className={`sidebar-link ${isActive("/admin/notifications") ? "active" : ""}`}
        >
          <span className="sidebar-link-icon">🔔</span>
          Notifications
        </Link>
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-logout" onClick={logout}>
          🚪 Sign Out
        </button>
      </div>

    </aside>
  );
};

export default AdminSidebar;