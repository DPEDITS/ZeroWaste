import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

const AdminUsers = () => {
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
    <AdminLayout>
      <div className="admin-action-bar">
        <div>
          <h1 className="admin-page-title">Users Management</h1>
          <p className="admin-page-subtitle">Manage donor and volunteer accounts</p>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="d-flex gap-3 mb-4">
        <input
          type="text"
          className="admin-form-input"
          style={{ maxWidth: '400px' }}
          placeholder="Search by name or email"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="admin-form-input"
          style={{ maxWidth: "200px" }}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="donor">Donor</option>
          <option value="volunteer">Volunteer</option>
        </select>
      </div>

      {/* CARD GRID */}
      <div className="donations-grid">
        {filteredUsers.map((user, index) => (
          <div className="donation-card" key={user._id}>
            <div className="donation-card-header mb-2">
              <div>
                <h5 className="food-title">{user.name}</h5>
                <p className="food-date m-0">{user.email}</p>
              </div>
            </div>

            <div className="donation-details">
              <div className="detail-pill" style={{textTransform: 'capitalize', background: user.role === 'donor' ? '#e8f5e9' : '#e0f2fe', color: user.role === 'donor' ? '#166534' : '#075985'}}>
                <span className="detail-pill-icon">{user.role === 'donor' ? '🍽️' : '🚚'}</span>
                {user.role}
              </div>
              <div className="detail-pill" style={{textTransform: 'capitalize', background: user.status === 'approved' ? '#f0fdf4' : user.status === 'pending' ? '#fffbeb' : '#fef2f2', color: user.status === 'approved' ? '#166534' : user.status === 'pending' ? '#b45309' : '#991b1b'}}>
                <span className="detail-pill-icon">{user.status === 'approved' ? '✅' : user.status === 'pending' ? '⏳' : '❌'}</span>
                {user.status}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-auto d-flex gap-2 flex-wrap">
              {user.status !== "approved" && (
                <button
                  className="btn-add-donation"
                  style={{padding: '8px 16px', fontSize: '13px'}}
                  onClick={() => approveUser(user._id)}
                >
                  ✅ Approve
                </button>
              )}

              {user.status !== "rejected" && (
                <button
                  className="btn-cancel"
                  style={{padding: '8px 16px', fontSize: '13px', background: '#fffbeb', borderColor: '#fde68a', color: '#b45309'}}
                  onClick={() => rejectUser(user._id)}
                >
                  ⚠️ Reject
                </button>
              )}

              <button
                className="btn-cancel"
                style={{padding: '8px 16px', fontSize: '13px', background: '#fef2f2', borderColor: '#fecaca', color: '#991b1b'}}
                onClick={() => deleteUser(user._id)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;