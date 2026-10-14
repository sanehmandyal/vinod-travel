const mongoose = require('mongoose');

let cachedConn = null;
let cachedPromise = null;

const connectDB = async () => {
  if (cachedConn && mongoose.connection.readyState >= 1) {
    return cachedConn;
  }

  if (cachedPromise) {
    return cachedPromise;
  }

  const defaultAtlasUri = 'mongodb://127.0.0.1:27017/vinod_tour_travels';
  const primaryUri = process.env.MONGO_URI || (process.env.VERCEL ? defaultAtlasUri : 'mongodb://127.0.0.1:27017/vinod_tour_travels');

  cachedPromise = mongoose.connect(primaryUri, {
    serverSelectionTimeoutMS: 15000,
    connectTimeoutMS: 15000,
    bufferCommands: false,
  }).then((conn) => {
    console.log(`MongoDB Connected: ${conn.connection.host} (${conn.connection.name})`);
    cachedConn = conn;
    return conn;
  }).catch(async (error) => {
    cachedPromise = null;
    console.warn(`Primary MongoDB connection failed (${error.message}).`);
    if (!process.env.VERCEL) {
      try {
        const fallbackConn = await mongoose.connect('mongodb://127.0.0.1:27017/vinod_tour_travels', {
          serverSelectionTimeoutMS: 5000,
          connectTimeoutMS: 5000,
        });
        console.log(`Fallback Local MongoDB Connected: ${fallbackConn.connection.host}`);
        cachedConn = fallbackConn;
        return fallbackConn;
      } catch (fallbackError) {
        console.error(`Local fallback also failed: ${fallbackError.message}`);
      }
    }
    throw error;
  });

  return cachedPromise;
};

module.exports = connectDB;

