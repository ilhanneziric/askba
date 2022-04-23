const express = require('express');
const router = express.Router();
const likeConstrollers = require('../controllers/likeConstrollers');
const auth = require('../utils/authMiddleware');

router.post('/', auth, likeConstrollers.addLike);
router.put('/:id', auth, likeConstrollers.updateLike);
router.delete('/:id', auth, likeConstrollers.deleteLike);
router.get('/question/:questionid', likeConstrollers.getLikeByQuestionId);
router.get('/asnwer/:answerid', likeConstrollers.getLikeByAnswerId);

module.exports = router;