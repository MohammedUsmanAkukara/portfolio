const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema(
  {
    theme: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    header: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    hero: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    about: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    skills: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    projects: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    experience: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    testimonials: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    contact: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    sectionVisibility: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    strict: false, // Allow any dynamic fields or nested updates from frontend customization
    timestamps: true,
  }
);

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;
