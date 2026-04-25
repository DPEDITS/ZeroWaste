import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users/all");
    setUsers(res.data.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/admin/login");
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    fetchUsers();
  };

  const approveUser = async (id) => {
    await axios.put(`http://localhost:5000/api/users/approve/${id}`);
    fetchUsers();
  };

  const rejectUser = async (id) => {
    await axios.put(`http://localhost:5000/api/users/reject/${id}`);
    fetchUsers();
  };

  const filteredUsers = users.filter((u) => {
    const matchRole = roleFilter === "all" || u.role === roleFilter;

    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    return matchRole && matchSearch;
  });

  return (
    <div className="d-flex">

      {/* Sidebar */}
      <div className="bg-dark text-white p-3 vh-100" style={{ width: "250px" }}>
        <h4>Admin Panel</h4>
        <button className="btn btn-danger mt-5 w-100" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Main */}
      <div className="flex-grow-1 p-4">

        <h2 className="mb-3">Users Management</h2>

        {/* Search + Filter */}
        <div className="d-flex gap-3 mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or email"
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="form-select"
            style={{ maxWidth: "200px" }}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="donor">Donor</option>
            <option value="volunteer">Volunteer</option>
          </select>
        </div>

        {/* 🔥 CARD GRID */}
        <div className="row">

          {filteredUsers.map((user, index) => (
            <div className="col-md-4 mb-4" key={user._id}>
              <div className="card shadow-sm h-100 p-3">

                <h5>{user.name}</h5>
                <p className="text-muted">{user.email}</p>

                <div className="mb-2">
                  <span className="badge bg-primary me-2">
                    {user.role}
                  </span>

                  <span
                    className={`badge ${
                      user.status === "approved"
                        ? "bg-success"
                        : user.status === "rejected"
                        ? "bg-danger"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {user.status}
                  </span>
                </div>

                {/* ACTIONS */}
                <div className="mt-auto d-flex gap-2 flex-wrap">

                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => approveUser(user._id)}
                  >
                    Approve
                  </button>

                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => rejectUser(user._id)}
                  >
                    Reject
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>

                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;