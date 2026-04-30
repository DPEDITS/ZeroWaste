import DonorSidebar from "./DonorSidebar";
import "../styles/donor.css";

const DonorLayout = ({ children }) => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="donor-layout">
      <DonorSidebar />
      <div className="donor-main">
        <div className="donor-topbar">
          <div className="topbar-breadcrumb">
            ZeroWaste / <span>Donor Panel</span>
          </div>
          <div className="topbar-actions">
            <span className="topbar-date">📅 {today}</span>
          </div>
        </div>
        <div className="donor-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DonorLayout;
