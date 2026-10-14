import React from 'react';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import ServicesSection from '../components/ServicesSection';
import ServiceLocationsSection from '../components/ServiceLocationsSection';
import ContactSection from '../components/ContactSection';

const Services = () => (
  <>
    <SEO
      title="Cab & Taxi Services in Una Himachal | Outstation, Local & Airport Cabs"
      description="24/7 Cab & Taxi Services from ISBT Una: Outstation cabs to Chandigarh & Delhi, airport pickups, pilgrimage yatra tours, and local rentals. Call +91 62305 21544."
      keywords={[
        'taxi service in una',
        'cab services himachal',
        'outstation cab una',
        'airport taxi una',
        'chintpurni cab booking',
        'chandigarh airport taxi from una',
        'delhi to una cab',
      ]}
      canonical="/services"
    />
    <PageHeader
      eyebrow="What We Offer"
      title="Cab & Tour Services from ISBT Una"
      description="Local rides, outstation drops, airport transfers and curated Himachal tours — all dispatched from our authorized ISBT Una counter."
    />
    <ServicesSection />
    <ServiceLocationsSection />
    <ContactSection showHeading={false} />
  </>
);

export default Services;
