import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className={`custom-navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">

        <Link to="/" className="logo">
          ♻️ <span className="logo-text">ZeroWaste</span>
        </Link>

        <div className="nav-links">
          <a href="#about">About</a>
<a href="#features">Features</a>
<a href="#faq">FAQ</a>
        </div>

        {/* Right Side */}
        <div className="nav-actions">

          {!user ? (
            <>
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/signup" className="signup-btn">Sign Up</Link>
            </>
          ) : (
            <>
              <span className="user-name">
                {user.name}
              </span>

              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}

        </div>

      </div>
    </nav>
  );
};

export default Navbar;