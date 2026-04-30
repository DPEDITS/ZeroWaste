import React, { useState, useEffect } from 'react';
import DonorLayout from '../components/DonorLayout';
import axios from 'axios';
import '../styles/donor.css';

const DonorNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;

        const res = await axios.get(`http://localhost:5000/api/notifications?role=donor&name=${encodeURIComponent(user.name)}`);
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
    <DonorLayout>
      <div className="donor-page-content" style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem', color: '#1f2937' }}>Real-Time Alerts</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {notifications.length === 0 ? (
            <p>No new notifications at this time.</p>
          ) : notifications.map(n => (
            <div key={n.id} className="donor-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
              <div className="card-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                {n.type === 'pickup' ? '🚚' : n.type === 'delivered' ? '✅' : '🌟'}
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: '500', color: '#374151' }}>{n.text}</p>
                <small style={{ color: '#6b7280' }}>{n.displayTime}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DonorLayout>
  );
};

export default DonorNotifications;
