import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Login from "../components/Login.jsx";
import Signup from "../components/Signup.jsx";
import Dashboard from "../components/Dashboard.jsx";

function App() {
  const [view, setView] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    setUser({ name: "Fularani Foundation", role: "ngo" });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setView("login");
  };

  if (isLoggedIn) {
    return (
      <div className="ff-page">
        <Navbar />
        <Dashboard user={user} onLogout={handleLogout} />
      </div>
    );
  }

  return (
    <div className="ff-page">
      <Navbar />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '32px' }}>
        <div className="ff-segmented-control">
          <button
            className={`ff-segment ${view === 'login' ? 'active' : ''}`}
            onClick={() => setView("login")}
          >
            Login
          </button>
          <button
            className={`ff-segment ${view === 'signup' ? 'active' : ''}`}
            onClick={() => setView("signup")}
          >
            Sign Up
          </button>
        </div>
      </div>
      {view === "login" ? <Login onLogin={handleLogin} /> : <Signup onLogin={handleLogin} />}
    </div>
  );
}
export default App;