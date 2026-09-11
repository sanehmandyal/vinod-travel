const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const User = require('./models/User');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const ensureAdminUser = async () => {
  const email = process.env.ADMIN_SEED_EMAIL || 'admin@vinodtravelsuna.com';
  const password = process.env.ADMIN_SEED_PASSWORD || 'V!nodTravels#2026Una';
  const existingAdmin = await User.findOne({ email });

  if (!existingAdmin) {
    await User.create({
      name: 'Vinod Travels Admin',
      email,
      password,
      role: 'admin',
    });
    console.log(`Admin user created -> email: ${email}`);
  }
};

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : '*',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Vinod Tour & Travels API' });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/vehicles', require('./routes/vehicleRoutes'));
app.use('/api/destinations', require('./routes/destinationRoutes'));
app.use('/api/tour-packages', require('./routes/tourPackageRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));
app.use('/api/uploads', require('./routes/uploadRoutes'));

// Serve admin-uploaded images (vehicle photos, destination photos, etc.)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve React build in production (client/dist)
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '..', 'client', 'dist');
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res) =>
    res.sendFile(path.join(clientBuildPath, 'index.html'))
  );
} else {
  app.get('/', (req, res) => res.send('Vinod Tour & Travels API is running...'));
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(async () => {
  await ensureAdminUser();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
