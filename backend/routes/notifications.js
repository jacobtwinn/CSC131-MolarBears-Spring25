
import router from 'express-promise-router';
import Notification from '../models/Notification';



// GET /api/notifications?role=patient&userId=...
router.get('/', async (req, res) => {
  const { role, userId } = req.query;

  try {
    let query = {};
    // Check if role is provided and set the query accordingly
    if (!role) {
      return res.status(400).json({ error: 'Role is required' });
    }
    if (role === 'patient') {
      query.role = 'patient';
      query.userId = userId; 
    } else if (role === 'dentist') {
      query.role = 'dentist';
    } else if (role === 'admin') {
      query.role = 'admin';
    }

    const notifications = await Notification.find(query).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;