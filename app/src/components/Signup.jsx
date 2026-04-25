import React, { useState } from "react";
import "../styles/signup.css";

function Signup({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("donor");

  return (
    <div className="signup-page">

      {/* LEFT SIDE */}
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

      {/* RIGHT SIDE */}
      <div className="signup-right">
        <div className="signup-card">

          <h2>Create Account</h2>

          <form>

            <input type="text" placeholder="Full Name" className="input" />

            <input type="email" placeholder="Email" className="input" />

            {/* ROLE */}
            <select
              className="input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="donor">Donor</option>
              <option value="volunteer">Volunteer</option>
            </select>

            {/* PASSWORD */}
            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input"
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                👁
              </span>
            </div>

            <button className="signup-btn" onClick={onLogin}>
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