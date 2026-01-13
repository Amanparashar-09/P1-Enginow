const mongoose = require('mongoose');

/**
 * MongoDB Connection Options
 */
const options = {
  maxPoolSize: 10,
  minPoolSize: 5,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4 // Use IPv4, skip trying IPv6
};

/**
 * Connect to MongoDB Atlas database with retry logic
 * @param {number} retries - Number of retry attempts
 * @returns {Promise<void>}
 */
const connectDB = async (retries = 5) => {
  try {
    // Validate MONGO_URI
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGO_URI, options);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`🔌 Connection State: ${conn.connection.readyState === 1 ? 'Connected' : 'Unknown'}`);

    // Set up connection event listeners
    setupConnectionListeners();

  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    
    if (retries > 0) {
      console.log(`🔄 Retrying connection... (${retries} attempts remaining)`);
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
      return connectDB(retries - 1);
    } else {
      console.error('❌ Failed to connect to MongoDB after multiple attempts');
      process.exit(1);
    }
  }
};

/**
 * Setup MongoDB Connection Event Listeners
 */
const setupConnectionListeners = () => {
  // Handle successful reconnection
  mongoose.connection.on('connected', () => {
    console.log('✅ MongoDB connected successfully');
  });

  // Handle disconnection
  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️  MongoDB disconnected');
  });

  // Handle reconnection
  mongoose.connection.on('reconnected', () => {
    console.log('🔄 MongoDB reconnected');
  });

  // Handle errors after initial connection
  mongoose.connection.on('error', (err) => {
    console.error(`❌ MongoDB error: ${err.message}`);
    
    // Don't exit on runtime errors, mongoose will handle reconnection
    if (err.name === 'MongoNetworkError') {
      console.log('🔄 Attempting to reconnect to MongoDB...');
    }
  });

  // Handle connection close
  mongoose.connection.on('close', () => {
    console.log('🔒 MongoDB connection closed');
  });
};

module.exports = connectDB;
