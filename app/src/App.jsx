import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Login from "../components/Login.jsx";
import Signup from "../components/Signup.jsx";

function App() {
  const [view, setView] = useState("login");

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
      {view === "login" ? <Login /> : <Signup />}
    </div>
  );
}
export default App;