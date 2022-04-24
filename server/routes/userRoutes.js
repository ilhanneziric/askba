const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');
const auth = require('../utils/authMiddleware');

router.get('/hotusers', userControllers.getHotUsers);
router.get('/:id', userControllers.getUser);
router.put('/:id', auth, userControllers.updateUser);
router.delete('/:id', auth, userControllers.deleteUser);

module.exports = router;