const express = require('express');
const router = express.Router();
const questionControllers = require('../controllers/questionControllers');
const auth = require('../utils/authMiddleware');

router.get('/', questionControllers.getAllQuestions);
router.get('/:id', questionControllers.getQuestion);
router.post('/', auth, questionControllers.addQuestion);
router.put('/:id', auth, questionControllers.updateQuestion);
router.delete('/:id', auth, questionControllers.deleteQuestion);

module.exports = router;