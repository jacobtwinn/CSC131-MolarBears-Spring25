import express from 'express';
import Notification from '../models/Notification.js';
import User from '../models/User.js'; // Import the User model

const router = express.Router();

// GET /api/notifications?userId=...
router.get('/', async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    // Fetch the user data from the users database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch the notifications for the user
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });

    // Combine user data with notifications
    const response = {
      user: {
        email: user.email,
        role: user.role,
      },
      notifications,
    };

    res.json(response);
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({ error: 'Server error' });
  }
  //DELETE /api/notifications/:id
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await Notification.findByIdAndDelete(id);
      if (!result) {
        return res.status(404).json({ error: 'Notification not found' });
      }
      res.status(204).send(); // No content
    } catch (err) {
      console.error('Error deleting notification:', err);
      res.status(500).json({ error: 'Failed to delete notification' });
    }
  });
});

export default router;