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

      {/* Header */}
      <div className="sidebar-header">
        <Link to="/" className="sidebar-logo">
          <div className="sidebar-logo-icon">♻️</div>
          <span className="sidebar-logo-text">ZeroWaste</span>
        </Link>

        <div className="sidebar-user">
          <div className="sidebar-avatar" style={{background: 'linear-gradient(135deg, #6366f1, #4f46e5)'}}>
            A
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">System Admin</div>
            <div className="sidebar-user-role">Management</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
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

      {/* Footer */}
      <div className="sidebar-footer">
        <button className="sidebar-logout" onClick={logout}>
          🚪 Sign Out
        </button>
      </div>

    </aside>
  );
};

export default AdminSidebar;