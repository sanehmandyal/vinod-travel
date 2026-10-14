import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer, { WhatsAppFloatButton } from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Home is kept eager so the landing page renders with zero bundle waterfall
import Home from './pages/Home';

// Public pages loaded lazily on demand
const Services = lazy(() => import('./pages/Services'));
const Fleet = lazy(() => import('./pages/Fleet'));
const Destinations = lazy(() => import('./pages/Destinations'));
const TourPackages = lazy(() => import('./pages/TourPackages'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Reviews = lazy(() => import('./pages/Reviews'));
const Contact = lazy(() => import('./pages/Contact'));
const LocationPage = lazy(() => import('./pages/LocationPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Admin pages loaded lazily on demand
const AdminLogin = lazy(() => import('./pages/admin/Login'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminBookings = lazy(() => import('./pages/admin/Bookings'));
const AdminVehicles = lazy(() => import('./pages/admin/Vehicles'));
const AdminDestinations = lazy(() => import('./pages/admin/Destinations'));
const AdminTourPackages = lazy(() => import('./pages/admin/TourPackages'));
const AdminGallery = lazy(() => import('./pages/admin/Gallery'));
const AdminReviews = lazy(() => import('./pages/admin/Reviews'));
const AdminEnquiries = lazy(() => import('./pages/admin/Enquiries'));
const AdminSettings = lazy(() => import('./pages/admin/Settings'));

const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

const PublicLayout = ({ children }) => (
  <>
    <Header />
    <Suspense fallback={<PageLoader />}>{children}</Suspense>
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

      {/* High-Intent Local SEO Landing Pages */}
      <Route path="/taxi-service-in-una" element={<PublicLayout><LocationPage locationSlug="taxi-service-in-una" /></PublicLayout>} />
      <Route path="/taxi-una" element={<PublicLayout><LocationPage locationSlug="taxi-service-in-una" /></PublicLayout>} />

      <Route path="/taxi-service-in-amb-andaura" element={<PublicLayout><LocationPage locationSlug="taxi-service-in-amb-andaura" /></PublicLayout>} />
      <Route path="/taxi-amb-andaura" element={<PublicLayout><LocationPage locationSlug="taxi-service-in-amb-andaura" /></PublicLayout>} />

      <Route path="/taxi-service-in-nangal" element={<PublicLayout><LocationPage locationSlug="taxi-service-in-nangal" /></PublicLayout>} />
      <Route path="/taxi-nangal" element={<PublicLayout><LocationPage locationSlug="taxi-service-in-nangal" /></PublicLayout>} />

      <Route path="/taxi-service-in-anandpur-sahib" element={<PublicLayout><LocationPage locationSlug="taxi-service-in-anandpur-sahib" /></PublicLayout>} />
      <Route path="/taxi-anandpur-sahib" element={<PublicLayout><LocationPage locationSlug="taxi-service-in-anandpur-sahib" /></PublicLayout>} />

      <Route path="/taxi-service-in-dharamshala" element={<PublicLayout><LocationPage locationSlug="taxi-service-in-dharamshala" /></PublicLayout>} />
      <Route path="/taxi-dharamshala" element={<PublicLayout><LocationPage locationSlug="taxi-service-in-dharamshala" /></PublicLayout>} />

      <Route path="/taxi-service-in-gagal-airport" element={<PublicLayout><LocationPage locationSlug="taxi-service-in-gagal-airport" /></PublicLayout>} />
      <Route path="/taxi-service-in-gaggal-airport" element={<PublicLayout><LocationPage locationSlug="taxi-service-in-gagal-airport" /></PublicLayout>} />
      <Route path="/taxi-gagal-airport" element={<PublicLayout><LocationPage locationSlug="taxi-service-in-gagal-airport" /></PublicLayout>} />
      <Route path="/taxi-gaggal-airport" element={<PublicLayout><LocationPage locationSlug="taxi-service-in-gagal-airport" /></PublicLayout>} />

      <Route path="/taxi-service-in-daulatpur-chowk" element={<PublicLayout><LocationPage locationSlug="taxi-service-in-daulatpur-chowk" /></PublicLayout>} />
      <Route path="/taxi-daulatpur-chowk" element={<PublicLayout><LocationPage locationSlug="taxi-service-in-daulatpur-chowk" /></PublicLayout>} />

      <Route path="/locations/:slug" element={<PublicLayout><LocationPage /></PublicLayout>} />

      {/* Admin */}
      <Route path="/admin/login" element={<Suspense fallback={<PageLoader />}><AdminLogin /></Suspense>} />
      <Route path="/admin/dashboard" element={<ProtectedRoute><Suspense fallback={<PageLoader />}><AdminDashboard /></Suspense></ProtectedRoute>} />
      <Route path="/admin/bookings" element={<ProtectedRoute><Suspense fallback={<PageLoader />}><AdminBookings /></Suspense></ProtectedRoute>} />
      <Route path="/admin/vehicles" element={<ProtectedRoute><Suspense fallback={<PageLoader />}><AdminVehicles /></Suspense></ProtectedRoute>} />
      <Route path="/admin/destinations" element={<ProtectedRoute><Suspense fallback={<PageLoader />}><AdminDestinations /></Suspense></ProtectedRoute>} />
      <Route path="/admin/tour-packages" element={<ProtectedRoute><Suspense fallback={<PageLoader />}><AdminTourPackages /></Suspense></ProtectedRoute>} />
      <Route path="/admin/gallery" element={<ProtectedRoute><Suspense fallback={<PageLoader />}><AdminGallery /></Suspense></ProtectedRoute>} />
      <Route path="/admin/reviews" element={<ProtectedRoute><Suspense fallback={<PageLoader />}><AdminReviews /></Suspense></ProtectedRoute>} />
      <Route path="/admin/enquiries" element={<ProtectedRoute><Suspense fallback={<PageLoader />}><AdminEnquiries /></Suspense></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute><Suspense fallback={<PageLoader />}><AdminSettings /></Suspense></ProtectedRoute>} />

      <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
    </Routes>
  );
}

export default App;
