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
        <h1>From Waste to Worth.</h1>
        <p>
          Join ZeroWaste and help turn surplus food into meaningful impact.
          Every day, tons of perfectly edible food go to waste while millions struggle with hunger. 
          ZeroWaste bridges this gap by connecting food donors with volunteers who ensure that surplus food 
          reaches those in need. Together, we turn waste into opportunity, reduce environmental impact, 
          and create a stronger, more compassionate community.
        </p>
      </div>

      <div className="signup-right">
        <div className="signup-card">
          <h2>Create Account</h2>

          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSignup}>
            <input 
              type="text" 
              placeholder="Full Name" 
              className="input" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input 
              type="email" 
              placeholder="Email" 
              className="input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <select
              className="input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="donor">Donor</option>
              <option value="volunteer">Volunteer</option>
            </select>

            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                👁
              </span>
            </div>

            <button type="submit" className="signup-btn">
              Create Account
            </button>
          </form>

          <p className="switch">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;