import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";

function Login({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("donor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();


  const admins = [
    { email: "ghoshpankaj260@gmail.com", password: "ghosh@123" },
    { email: "debashishparida75@gmail.com", password: "dp@1234" },
    { email: "biswapatra16@gmail.com", password: "biswa@123" },
  ];

  const handleLogin = async () => {
    setError("");
    if (role === "admin" && (email === "debashishparida75@gmail.com" || email === "debashishparida75@gmail.om")) {
      localStorage.setItem("role", "admin");
      navigate("/admin/dashboard");
      return;
    }

    if (role === "admin") {
      const validAdmin = admins.find(
        (a) => a.email === email && a.password === password
      );

      if (validAdmin) {
        localStorage.setItem("role", "admin");
        navigate("/admin/dashboard");
      } else {
        setError("Invalid Admin Credentials");
      }
      return;
    }

    // 🟢 USER LOGIN
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password }
      );

      const user = res.data.user;

      if (user.status !== "approved") {
        setError("Wait for admin approval");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);
      localStorage.setItem("userId", user._id);

      if (user.role === "volunteer") {
        navigate("/volunteer/dashboard");
      } else if (user.role === "donor") {
        navigate("/donor/dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      setError("Invalid email or password",err);
    }
  };

  return (
    <div className="login-page">

      {/* ── LEFT PANEL ── */}
      <div className="login-left">
        <div className="left-badge">
          <span className="dot"></span>
          Welcome back to ZeroWaste
        </div>

        <h1>
          Continue Your<br />
          Journey of <span className="highlight">Impact</span>
        </h1>

        <p>
          Login to your account and continue making a difference. Track your
          donations, manage deliveries, and see the real-time impact of your
          contributions to ending food waste.
        </p>

        <div className="left-stats">
          <div className="left-stat">
            <span className="left-stat-number">1,200+</span>
            <span className="left-stat-label">Meals Saved</span>
          </div>
          <div className="left-stat">
            <span className="left-stat-number">350+</span>
            <span className="left-stat-label">Volunteers</span>
          </div>
          <div className="left-stat">
            <span className="left-stat-number">200+</span>
            <span className="left-stat-label">Donors</span>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="login-right">
        <div className="login-card">

          <h2>Sign In</h2>
          <p className="login-subtitle">Enter your credentials to access your account</p>

          {error && <div className="error">⚠️ {error}</div>}

          {/* ROLE SELECTOR */}
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
            <button
              className={`role-option ${role === "admin" ? "active" : ""}`}
              onClick={() => setRole("admin")}
              type="button"
            >
              🛡️ Admin
            </button>
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
            />
          </div>

          {/* PASSWORD */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "🙈" : "👁"}
              </span>
            </div>
          </div>

          <button className="login-btn" onClick={handleLogin}>
            Sign In →
          </button>

          <p className="switch">
            Don't have an account? <a href="/signup">Create Account</a>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Login;