import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const admins = [
    { email: "ghoshpankaj260@gmail.com", password: "ghosh@123" },
    { email: "debashishparida75@gmail.com", password: "dp@1234" },
    { email: "biswapatra16@gmail.com", password: "biswa@123" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    const validAdmin = admins.find(
      (a) => a.email === email && a.password === password
    );

    if (validAdmin) {
      localStorage.setItem("role", "admin");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 mx-auto" style={{ maxWidth: "400px" }}>
        <h3 className="text-center">Admin Login</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-dark w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;