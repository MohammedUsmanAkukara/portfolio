const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/custom_portfolio');
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    // Do not crash immediately in dev if DB is offline, let the server start so frontend can fall back to local storage!
    console.warn('⚠️ Server will continue running without MongoDB. API requests that need DB will fail and frontend will fallback to localStorage.');
  }
};

module.exports = connectDB;
