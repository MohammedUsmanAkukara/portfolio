const express = require('express');
const router = express.Router();
const {
  createMessage,
  getMessages,
  deleteMessage,
  toggleReadStatus,
} = require('../controllers/messageController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .post(createMessage)
  .get(protect, getMessages);

router.route('/:id')
  .delete(protect, deleteMessage);

router.patch('/:id/read', protect, toggleReadStatus);

module.exports = router;
