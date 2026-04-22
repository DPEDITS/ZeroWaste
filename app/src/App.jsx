import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Login from "../components/Login.jsx";
import Signup from "../components/Signup.jsx";

function App() {
  const [view, setView] = useState("login");

  return (
    <>
      <Navbar />
      <div className="container text-center mt-5 mb-2">
        <div className="container-view-toggle">
          <button 
            className={`btn ${view === 'login' ? 'btn-primary text-white' : 'btn-light'} me-1`} 
            onClick={() => setView("login")}
          >
            Login
          </button>
          <button 
            className={`btn ${view === 'signup' ? 'btn-success text-white' : 'btn-light'}`} 
            onClick={() => setView("signup")}
          >
            Sign Up
          </button>
        </div>
      </div>
      {view === "login" ? <Login /> : <Signup />}
    </>
  );
}
export default App;