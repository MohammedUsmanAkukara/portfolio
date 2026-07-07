const express = require('express');
const router = express.Router();
const {
  getPortfolio,
  updatePortfolio,
  resetPortfolio,
} = require('../controllers/portfolioController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .get(getPortfolio)
  .put(protect, updatePortfolio);

router.post('/reset', protect, resetPortfolio);

module.exports = router;
