import VolunteerSidebar from "./VolunteerSidebar";
import "../styles/volunteer.css";

const VolunteerLayout = ({ children }) => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="vol-layout">
      <VolunteerSidebar />
      <div className="vol-main">
        <div className="vol-topbar">
          <div className="topbar-breadcrumb">
            ZeroWaste / <span>Volunteer Panel</span>
          </div>
          <div className="topbar-actions">
            <span className="topbar-date">📅 {today}</span>
          </div>
        </div>
        <div className="vol-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default VolunteerLayout;
