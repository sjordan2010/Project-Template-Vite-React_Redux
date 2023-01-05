const express = require('express');
const router = express.Router();
const {
  createUser,
  loginUser,
  getUser,
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');
router.post('/', createUser);
router.post('/login', loginUser);
router.get('/me', protect, getUser);

module.exports = router;
