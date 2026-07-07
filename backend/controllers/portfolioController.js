const Portfolio = require('../models/Portfolio');
const defaultData = require('../data/defaultData');

// @desc    Get portfolio configuration
// @route   GET /api/portfolio
// @access  Public
const getPortfolio = async (req, res, next) => {
  try {
    let portfolio = await Portfolio.findOne();

    // If no portfolio config exists in DB yet, seed with default factory data
    if (!portfolio) {
      portfolio = await Portfolio.create(defaultData);
      console.log('🌱 Seeded default portfolio configuration into MongoDB');
    }

    res.status(200).json({
      success: true,
      data: portfolio,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update portfolio configuration (partial or full)
// @route   PUT /api/portfolio
// @access  Public / Admin
const updatePortfolio = async (req, res, next) => {
  try {
    let portfolio = await Portfolio.findOne();

    if (!portfolio) {
      portfolio = new Portfolio(defaultData);
    }

    // Update fields dynamically
    Object.keys(req.body).forEach((key) => {
      // Avoid overwriting mongo internals
      if (key !== '_id' && key !== '__v' && key !== 'createdAt' && key !== 'updatedAt') {
        portfolio[key] = req.body[key];
      }
    });

    // Mark modified for mixed types in mongoose if needed
    portfolio.markModified('theme');
    portfolio.markModified('header');
    portfolio.markModified('hero');
    portfolio.markModified('about');
    portfolio.markModified('skills');
    portfolio.markModified('projects');
    portfolio.markModified('experience');
    portfolio.markModified('testimonials');
    portfolio.markModified('contact');
    portfolio.markModified('sectionVisibility');

    const updatedPortfolio = await portfolio.save();

    res.status(200).json({
      success: true,
      message: 'Portfolio configuration updated successfully!',
      data: updatedPortfolio,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reset portfolio to default factory settings
// @route   POST /api/portfolio/reset
// @access  Public / Admin
const resetPortfolio = async (req, res, next) => {
  try {
    await Portfolio.deleteMany({});
    const newPortfolio = await Portfolio.create(defaultData);

    res.status(200).json({
      success: true,
      message: 'Portfolio configuration reset to factory defaults!',
      data: newPortfolio,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPortfolio,
  updatePortfolio,
  resetPortfolio,
};
