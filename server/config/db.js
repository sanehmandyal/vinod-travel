const mongoose = require('mongoose');

let cachedConn = null;

const connectDB = async () => {
  if (cachedConn && mongoose.connection.readyState >= 1) {
    return cachedConn;
  }

  const defaultAtlasUri = 'mongodb+srv://sanehmandyal_db_user:BTXPZt35IPaJmqE2@cluster0.b7aetn4.mongodb.net/vinod_tour_travels?retryWrites=true&w=majority';
  const primaryUri = process.env.MONGO_URI || (process.env.VERCEL ? defaultAtlasUri : 'mongodb://127.0.0.1:27017/vinod_tour_travels');
  try {
    const conn = await mongoose.connect(primaryUri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host} (${conn.connection.name})`);
    cachedConn = conn;
    return conn;
  } catch (error) {
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
  }
};

module.exports = connectDB;
