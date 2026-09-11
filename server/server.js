const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const ensureAdminUser = async () => {
  try {
    const email = (process.env.ADMIN_SEED_EMAIL || 'admin@vinodtravelsuna.com').toLowerCase().trim();
    const password = process.env.ADMIN_SEED_PASSWORD || 'VinodTravels@2026';
    const existingAdmin = await User.findOne({ email });

    if (!existingAdmin) {
      await User.create({
        name: 'Vinod Travels Admin',
        email,
        password,
        role: 'admin',
      });
      console.log(`Admin user created -> email: ${email}`);
    } else {
      const isMatch = await existingAdmin.matchPassword(password);
      if (!isMatch) {
        existingAdmin.password = password;
        await existingAdmin.save();
        console.log(`Admin password updated to current seed -> email: ${email}`);
      }
    }
  } catch (err) {
    console.error('Error ensuring admin user:', err.message);
  }
};

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'https://vinod-tour-travel.vercel.app',
  'https://vinod-travel.vercel.app',
];
if (process.env.CLIENT_URL) {
  process.env.CLIENT_URL.split(',').forEach((url) => {
    const trimmed = url.trim().replace(/\/$/, '');
    if (trimmed && !allowedOrigins.includes(trimmed)) {
      allowedOrigins.push(trimmed);
    }
  });
}

const fs = require('fs');

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const normalized = origin.replace(/\/$/, '');
      if (
        allowedOrigins.includes(normalized) ||
        normalized.startsWith('http://localhost:') ||
        normalized.startsWith('http://127.0.0.1:') ||
        normalized.endsWith('.vercel.app') ||
        normalized.endsWith('.onrender.com')
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  })
);
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(['/api/health', '/health'], (req, res) => {
  res.json({
    status: 'ok',
    service: 'Vinod Tour & Travels API',
    dbConnected: mongoose.connection.readyState >= 1,
  });
});

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Ensure database connection and admin user before any request is processed
let isConnected = false;
let adminEnsured = false;

app.use(async (req, res, next) => {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
    } catch (err) {
      console.error('Database connection error in request:', err.message);
      return res.status(503).json({
        message: 'Database unavailable. Configure a reachable MONGO_URI in the deployment environment.',
      });
    }
  }

  if (isConnected && !adminEnsured) {
    try {
      await ensureAdminUser();
      adminEnsured = true;
    } catch (err) {
      console.error('Admin initialization error:', err.message);
    }
  }

  next();
});

const mountApiRoutes = (router) => {
  router.use('/auth', require('./routes/authRoutes'));
  router.use('/bookings', require('./routes/bookingRoutes'));
  router.use('/vehicles', require('./routes/vehicleRoutes'));
  router.use('/destinations', require('./routes/destinationRoutes'));
  router.use('/tour-packages', require('./routes/tourPackageRoutes'));
  router.use('/gallery', require('./routes/galleryRoutes'));
  router.use('/reviews', require('./routes/reviewRoutes'));
  router.use('/contact', require('./routes/contactRoutes'));
  router.use('/settings', require('./routes/settingsRoutes'));
  router.use('/uploads', require('./routes/uploadRoutes'));
};

const apiRouter = express.Router();
mountApiRoutes(apiRouter);
app.use('/api', apiRouter);
app.use(apiRouter);

// Serve admin-uploaded images (vehicle photos, destination photos, etc.)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve React build in production only if client/dist exists (e.g. not on standalone API hosts like Render)
const clientBuildPath = path.join(__dirname, '..', 'client', 'dist');
const indexHtmlPath = path.join(clientBuildPath, 'index.html');

if (fs.existsSync(indexHtmlPath) && !process.env.VERCEL) {
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res) => res.sendFile(indexHtmlPath));
} else {
  app.get('/', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Vinod Tour & Travels API',
      message: 'API is running successfully',
    });
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (!process.env.VERCEL) {
  connectDB()
    .then(async () => {
      await ensureAdminUser();
      isConnected = true;
      adminEnsured = true;
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
      console.error('Initial DB connection failed:', err.message);
      app.listen(PORT, () => console.log(`Server running on port ${PORT} (DB not connected)`));
    });
}

module.exports = app;
