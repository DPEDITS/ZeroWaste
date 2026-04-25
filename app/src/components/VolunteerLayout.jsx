import VolunteerSidebar from "./VolunteerSidebar";

const VolunteerLayout = ({ children }) => {
  return (
    <div className="d-flex">
      <VolunteerSidebar />
      <div className="flex-grow-1 p-4">
        {children}
      </div>
    </div>
  );
};

export default VolunteerLayout;
