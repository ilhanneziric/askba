const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');
const auth = require('../utils/authMiddleware');

router.post('/register', authControllers.register);
router.post('/login', authControllers.login);
router.get('/is-verify', auth,authControllers.isVerify);

module.exports = router;