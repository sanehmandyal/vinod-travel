import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer, { WhatsAppFloatButton } from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Services from './pages/Services';
import Fleet from './pages/Fleet';
import Destinations from './pages/Destinations';
import TourPackages from './pages/TourPackages';
import Gallery from './pages/Gallery';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminBookings from './pages/admin/Bookings';
import AdminVehicles from './pages/admin/Vehicles';
import AdminDestinations from './pages/admin/Destinations';
import AdminTourPackages from './pages/admin/TourPackages';
import AdminGallery from './pages/admin/Gallery';
import AdminReviews from './pages/admin/Reviews';
import AdminEnquiries from './pages/admin/Enquiries';
import AdminSettings from './pages/admin/Settings';

const PublicLayout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
    <WhatsAppFloatButton />
  </>
);

function App() {
  return (
    <Routes>
      {/* Public website */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
      <Route path="/fleet" element={<PublicLayout><Fleet /></PublicLayout>} />
      <Route path="/destinations" element={<PublicLayout><Destinations /></PublicLayout>} />
      <Route path="/tour-packages" element={<PublicLayout><TourPackages /></PublicLayout>} />
      <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
      <Route path="/reviews" element={<PublicLayout><Reviews /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/bookings" element={<ProtectedRoute><AdminBookings /></ProtectedRoute>} />
      <Route path="/admin/vehicles" element={<ProtectedRoute><AdminVehicles /></ProtectedRoute>} />
      <Route path="/admin/destinations" element={<ProtectedRoute><AdminDestinations /></ProtectedRoute>} />
      <Route path="/admin/tour-packages" element={<ProtectedRoute><AdminTourPackages /></ProtectedRoute>} />
      <Route path="/admin/gallery" element={<ProtectedRoute><AdminGallery /></ProtectedRoute>} />
      <Route path="/admin/reviews" element={<ProtectedRoute><AdminReviews /></ProtectedRoute>} />
      <Route path="/admin/enquiries" element={<ProtectedRoute><AdminEnquiries /></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />

      <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
    </Routes>
  );
}

export default App;
