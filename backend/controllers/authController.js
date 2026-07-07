const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');

// Generate JWT Token helper
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'supersecretportfoliojwtkey2026', {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

// Auto seed initial admin account if none exists
const seedAdminIfNeeded = async () => {
  try {
    const count = await User.countDocuments();
    if (count === 0) {
      const defaultAdmin = await User.create({
        name: 'Administrator',
        email: 'admin@example.com',
        password: 'admin123',
      });
      console.log('👤 Seeded default admin account -> Email: admin@example.com | Password: admin123');
      return defaultAdmin;
    }
  } catch (err) {
    console.error('Error checking/seeding admin:', err.message);
  }
  return null;
};

// @desc    Auth user & get token (Login)
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    // Ensure default admin exists if DB was empty
    await seedAdminIfNeeded();

    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide an email and password');
    }

    // Check for user
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      res.status(401);
      throw new Error('Invalid email or password');
    }

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Forgot password -> Generate reset token & link
// @route   POST /api/auth/forgotpassword
// @access  Public
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400);
      throw new Error('Please enter your email address');
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      res.status(404);
      throw new Error('There is no user registered with that email address');
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // Create reset url for testing convenience
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
    console.log(`🔐 Password Reset Token generated for ${user.email}: ${resetToken}`);

    res.status(200).json({
      success: true,
      message: 'Password reset link generated successfully!',
      resetToken: resetToken,
      resetUrl: resetUrl,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reset password using token
// @route   PUT /api/auth/resetpassword/:resetToken
// @access  Public
const resetPassword = async (req, res, next) => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resetToken)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400);
      throw new Error('Invalid or expired password reset token');
    }

    if (!req.body.password || req.body.password.length < 6) {
      res.status(400);
      throw new Error('Password must be at least 6 characters long');
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully! You can now log in with your new password.',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get currently logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  forgotPassword,
  resetPassword,
  getMe,
  seedAdminIfNeeded,
};
