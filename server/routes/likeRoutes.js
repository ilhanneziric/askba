const express = require('express');
const router = express.Router();
const likeConstrollers = require('../controllers/likeConstrollers');
const auth = require('../utils/authMiddleware');

router.post('/', auth, likeConstrollers.addLike);
router.put('/:id', auth, likeConstrollers.updateLike);
router.delete('/:id', auth, likeConstrollers.deleteLike);
router.delete('/:questionid', likeConstrollers.getLikeByQuestionId);
router.delete('/:answerid', likeConstrollers.getLikeByAnswerId);

module.exports = router;