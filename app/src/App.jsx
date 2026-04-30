import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

// Admin
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminUsers from "./pages/AdminUsers";
import AdminDonations from "./pages/AdminDonations";
import AdminNotifications from "./pages/AdminNotifications";

// Volunteer
import VolunteerDashboard from "./pages/VolunteerDashboard";
import VolunteerDonations from "./pages/VolunteerDonations";
import MyDeliveries from "./pages/MyDeliveries";
import VolunteerNotifications from "./pages/VolunteerNotifications";

// Donor
import DonorDashboard from "./pages/DonorDashboard";
import DonorDonations from "./pages/DonorDonations";
import DonorNotifications from "./pages/DonorNotifications";

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  const isVolunteerPage = location.pathname.startsWith("/volunteer");
  const isDonorPage = location.pathname.startsWith("/donor");
  const isDashboard = isAdminPage || isVolunteerPage || isDonorPage;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      
      {!isDashboard && <Navbar />}

      <main style={{ flex: 1 }}>
        {children}
      </main>

      {!isDashboard && <Footer />}

    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>

          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ADMIN */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
          <Route path="/admin/donations" element={<ProtectedRoute><AdminDonations /></ProtectedRoute>} />
          <Route path="/admin/notifications" element={<ProtectedRoute><AdminNotifications /></ProtectedRoute>} />

          {/* VOLUNTEER */}
          <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
          <Route path="/volunteer/donations" element={<VolunteerDonations />} />
          <Route path="/volunteer/my-deliveries" element={<MyDeliveries />} />
          <Route path="/volunteer/notifications" element={<VolunteerNotifications />} />

          {/* DONOR */}
          <Route path="/donor/dashboard" element={<DonorDashboard />} />
          <Route path="/donor/donations" element={<DonorDonations />} />
          <Route path="/donor/notifications" element={<DonorNotifications />} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;