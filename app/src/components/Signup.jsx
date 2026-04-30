import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/signup.css";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("donor");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/users/signup", {
        name,
        email,
        password,
        role,
      });

      if (res.data.success) {
        setMessage(res.data.message);
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signup-page">

      <div className="signup-left">
        <div className="left-badge">
          <span className="dot"></span>
          Join the movement
        </div>

        <h1>
          From Waste<br />
          to <span className="highlight">Worth</span>
        </h1>

        <p>
          Join ZeroWaste and help turn surplus food into meaningful impact. 
          Whether you're donating food or volunteering for deliveries, your 
          contribution creates a stronger, more compassionate community.
        </p>

        <div className="left-features">
          <div className="left-feature-item">
            <span className="lf-icon">🌍</span>
            <span>Reduce food waste in your community</span>
          </div>
          <div className="left-feature-item">
            <span className="lf-icon">🤝</span>
            <span>Connect with donors and volunteers</span>
          </div>
          <div className="left-feature-item">
            <span className="lf-icon">📊</span>
            <span>Track your real-time impact</span>
          </div>
          <div className="left-feature-item">
            <span className="lf-icon">❤️</span>
            <span>Help feed families in need</span>
          </div>
        </div>
      </div>

      <div className="signup-right">
        <div className="signup-card">

          <h2>Create Account</h2>
          <p className="signup-subtitle">Join the community making a difference</p>

          {message && <div className="alert alert-success">✅ {message}</div>}
          {error && <div className="alert alert-danger">⚠️ {error}</div>}

          <form onSubmit={handleSignup}>

            <div className="role-selector">
              <button
                className={`role-option ${role === "donor" ? "active" : ""}`}
                onClick={() => setRole("donor")}
                type="button"
              >
                🍽️ Donor
              </button>
              <button
                className={`role-option ${role === "volunteer" ? "active" : ""}`}
                onClick={() => setRole("volunteer")}
                type="button"
              >
                🚚 Volunteer
              </button>
            </div>

            {/* NAME */}
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                placeholder="Enter your full name" 
                className="input" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* EMAIL */}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                placeholder="you@example.com" 
                className="input" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="password-box">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "🙈" : "👁"}
                </span>
              </div>
            </div>

            <button type="submit" className="signup-btn">
              🌱 Create Account
            </button>
          </form>

          <p className="switch">
            Already have an account? <a href="/login">Sign In</a>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Signup;