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
import AdminRequests from "./pages/AdminRequests";
const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      
      {!isAdminPage && <Navbar />}

      <main style={{ flex: 1 }}>
        {children}
      </main>

      {!isAdminPage && <Footer />}

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
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
<Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
<Route path="/admin/donations" element={<ProtectedRoute><AdminDonations /></ProtectedRoute>} />
<Route path="/admin/requests" element={<ProtectedRoute><AdminRequests /></ProtectedRoute>} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;