import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import moment from 'moment';
import '/src/CSS/NotificationPage.css';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    // Simulate fetching user data
    const fetchUser = async () => {
      const res = await axios.get('/api/auth/me'); // Example endpoint
      setCurrentUser(res.data);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`/api/notifications?role=${currentUser.role}&userId=${currentUser._id}`);
        setNotifications(res.data);
      } catch (err) {
        console.error("Error fetching notifications", err);
      }
    };

    fetchNotifications();
  }, [currentUser]);

  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((note) => note._id !== id));
  };

  if (!currentUser) return <div>Loading user data...</div>;

  return (
    <div className="notification-container">
      <div className="notifications-box">
        <h1 className="notifications-title">Notification Hub</h1>
        <ul className="notification-list">
          {Array.isArray(notifications) && notifications.length > 0 ? (
            notifications.map((note, index) => (
              <li
                key={note._id}
                className={`notification-item ${index > 1 ? 'faded' : ''}`}
              >
                <div>
                  <p className="notification-title">{note.messageTitle || 'Notification'}</p>
                  <p className="notification-message">{note.message}</p>
                  <p className="notification-time">{moment(note.createdAt).fromNow()}</p>
                </div>
                <button
                  onClick={() => dismissNotification(note._id)}
                  className="dismiss-button"
                >
                  Dismiss
                </button>
              </li>
            ))
          ) : (
            <li className="notification-item">No notifications available</li>
          )}
        </ul>
        <div className="view-all">
          <button>View All</button>
        </div>
      </div>

      <div className="illustration-box">
        <img
          src="/logo.png" // adjust path based on your public folder
          alt="Illustration"
          className="illustration-img"
        />
      </div>
    </div>
  );
};

export default NotificationPage;
