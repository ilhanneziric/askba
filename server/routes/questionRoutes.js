const express = require('express');
const router = express.Router();
const questionControllers = require('../controllers/questionControllers');
const auth = require('../utils/authMiddleware');

router.get('/hotquestions', questionControllers.getHotQuestions);
router.get('/:offset', questionControllers.getAllQuestions);
router.get('/getbyid/:id', questionControllers.getQuestion);
router.get('/user/:id/:offset', auth, questionControllers.getAllQuestionsByUserId);
router.post('/', auth, questionControllers.addQuestion);
router.put('/:id', auth, questionControllers.updateQuestion);
router.delete('/:id', auth, questionControllers.deleteQuestion);

module.exports = router;