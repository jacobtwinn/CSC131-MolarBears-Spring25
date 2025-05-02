import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import '/src/CSS/NotificationPage.css';
import { useAuth } from '../context/AuthContext';

const NotificationPage = () => {
  const { userInfo } = useAuth(); // Get user info from AuthContext
  const [notifications, setNotifications] = useState([]);
  const [showAll, setShowAll] = useState(false); // State to toggle between showing all or limited notifications

  useEffect(() => {
    if (!userInfo || !userInfo._id) {
      console.error('User ID is missing');
      return;
    }

    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/notifications?userId=${userInfo._id}`);
        console.log('API Response:', res.data); // Log the full response
        setNotifications(res.data.notifications || []);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    };

    fetchNotifications();
  }, [userInfo]);

  const dismissNotification = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/notifications/${id}`);
      setNotifications((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      console.error('Error dismissing notification:', err);
    }
  };

  if (!userInfo) return <div>Loading user data...</div>;

  // Determine which notifications to display
  const displayedNotifications = showAll ? notifications : notifications.slice(0, 5);

  return (
    <div className="notification-container">
      <div className="notifications-box">
        <h1 className="notifications-title">Notification Hub</h1>
        <ul className="notification-list">
          {Array.isArray(displayedNotifications) && displayedNotifications.length > 0 ? (
            displayedNotifications.map((note, index) => (
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
        {notifications.length > 5 && (
          <div className="view-all">
            <button onClick={() => setShowAll(!showAll)}>
              {showAll ? 'Show Less' : 'View All'}
            </button>
          </div>
        )}
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
