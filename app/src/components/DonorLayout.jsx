import DonorSidebar from "./DonorSidebar";

const DonorLayout = ({ children }) => {
  return (
    <div className="d-flex">
      <DonorSidebar />
      <div className="flex-grow-1 p-4">
        {children}
      </div>
    </div>
  );
};

export default DonorLayout;
