import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import BookingEngine from '../components/BookingEngine';
import ServicesSection from '../components/ServicesSection';
import ServiceLocationsSection from '../components/ServiceLocationsSection';
import FleetSection from '../components/FleetSection';
import DestinationsSection from '../components/DestinationsSection';
import WhyChooseUsSection from '../components/WhyChooseUsSection';
import TourPackagesSection from '../components/TourPackagesSection';
import ReviewsSection from '../components/ReviewsSection';
import GallerySection from '../components/GallerySection';
import ContactSection from '../components/ContactSection';

const Home = () => (
  <>
    <SEO
      title="Vinod Tour & Travels | #1 Taxi Service in Una Himachal | 24/7 Cab Booking ISBT Una"
      description="Top-rated 24/7 taxi service in Una, Amb Andaura, Nangal, Anandpur Sahib, Dharamshala, Gaggal Airport & Daulatpur Chowk. Clean AC cars, expert hill drivers, guaranteed on-time pickup. Call +91 62305 21544."
      keywords={[
        'taxi service in una',
        'cab booking una himachal',
        'amb andaura railway station taxi',
        'vande bharat taxi amb andaura',
        'nangal taxi service',
        'anandpur sahib cab service',
        'dharamshala taxi service',
        'gagal airport taxi',
        'gaggal airport cab service',
        'daulatpur chowk taxi',
        'isbt una taxi stand',
        'outstation cabs una to chandigarh',
        'una to delhi taxi',
        'chintpurni taxi service',
      ]}
      canonical="/"
    />
    <Hero />
    <BookingEngine />
    <ServicesSection />
    <ServiceLocationsSection />
    <FleetSection limit={4} />
    <DestinationsSection limit={6} />
    <WhyChooseUsSection />
    <TourPackagesSection limit={4} />
    <ReviewsSection limit={3} />
    <GallerySection limit={4} />
    <ContactSection />
  </>
);

export default Home;
