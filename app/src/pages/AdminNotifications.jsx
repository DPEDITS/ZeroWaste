import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import axios from 'axios';
import '../styles/admin.css';

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/notifications?role=admin");
        if (res.data.success) {
          setNotifications(res.data.notifications);
        }
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      }
    };
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);
  return (
    <AdminLayout>
      <div className="admin-page-content" style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem', color: '#1f2937' }}>Real-Time Alerts</h2>
        <div className="dashboard-cards" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {notifications.length === 0 ? (
            <p>No new notifications at this time.</p>
          ) : notifications.map(n => (
            <div key={n.id} className="stat-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
              <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#4f46e5' }}>
                {n.type === 'food' ? '🍱' : n.type === 'user' ? '👤' : '⚙️'}
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: '500', color: '#374151' }}>{n.text}</p>
                <small style={{ color: '#6b7280' }}>{n.displayTime}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminNotifications;
