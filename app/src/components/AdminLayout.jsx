import AdminSidebar from "./AdminSidebar";
import "../styles/admin.css";

const AdminLayout = ({ children }) => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <div className="admin-topbar">
          <div className="topbar-breadcrumb">
            ZeroWaste / <span>Admin Panel</span>
          </div>
          <div className="topbar-actions">
            <span className="topbar-date">📅 {today}</span>
          </div>
        </div>
        <div className="admin-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;