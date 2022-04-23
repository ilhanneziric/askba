const express = require('express');
const router = express.Router();
const notificationConstrollers = require('../controllers/notificationControllers');
const auth = require('../utils/authMiddleware');

router.post('/', auth, notificationConstrollers.addNotification);
router.delete('/:id', auth, notificationConstrollers.deleteNotification);
router.get('/user/:userid', auth, notificationConstrollers.getNotificationByUserId);
router.post('/user/:userid', notificationConstrollers.setNotificationsSeenByUserId);

module.exports = router;
