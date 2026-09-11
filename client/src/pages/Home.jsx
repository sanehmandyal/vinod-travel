import React from 'react';
import Hero from '../components/Hero';
import BookingEngine from '../components/BookingEngine';
import ServicesSection from '../components/ServicesSection';
import FleetSection from '../components/FleetSection';
import DestinationsSection from '../components/DestinationsSection';
import WhyChooseUsSection from '../components/WhyChooseUsSection';
import TourPackagesSection from '../components/TourPackagesSection';
import ReviewsSection from '../components/ReviewsSection';
import GallerySection from '../components/GallerySection';
import ContactSection from '../components/ContactSection';

const Home = () => (
  <>
    <Hero />
    <BookingEngine />
    <ServicesSection />
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
