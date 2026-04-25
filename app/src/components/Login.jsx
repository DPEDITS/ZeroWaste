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

  // Hardcoded Admins
  const admins = [
    { email: "ghoshpankaj260@gmail.com", password: "ghosh@123" },
    { email: "debashishparida75@gmail.com", password: "dp@1234" },
    { email: "biswapatra16@gmail.com", password: "biswa@123" },
  ];

  const handleLogin = async () => {
    setError("");

    // 🔴 ADMIN LOGIN
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
      } else {
        navigate("/");
      }

    } catch (err) {
      setError("Invalid email or password",err);
    }
  };

  return (
    <div className="login-page">

      {/* LEFT SIDE */}
      <div className="login-left">
        <h1>Welcome Back</h1>
        <p>Login to continue reducing food waste and making impact.
  Every day, tons of perfectly edible food go to waste while millions struggle with hunger. 
  ZeroWaste bridges this gap by connecting food donors with volunteers who ensure that surplus food 
  reaches those in need. Together, we turn waste into opportunity, reduce environmental impact, 
  and create a stronger, more compassionate community.
</p>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <div className="login-card">

          <h2>Login</h2>

          {error && <div className="error">{error}</div>}

          {/* ROLE */}
          <select
            className="input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="donor">Donor</option>
            <option value="volunteer">Volunteer</option>
            <option value="admin">Admin</option>
          </select>

          <input
            type="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span onClick={() => setShowPassword(!showPassword)}>👁</span>
          </div>

          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>

          <p className="switch">
            Don’t have an account? <a href="/signup">Sign Up</a>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Login;