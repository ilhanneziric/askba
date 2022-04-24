const express = require('express');
const router = express.Router();
const answerControllers = require('../controllers/answerControllers');
const auth = require('../utils/authMiddleware');

router.get('/', answerControllers.getAllAnswers);
router.get('/:id', answerControllers.getAnswer);
router.post('/', auth, answerControllers.addAnswer);
router.put('/:id', auth, answerControllers.updateAnswer);
router.delete('/:id', auth, answerControllers.deleteAnswer);

module.exports = router;