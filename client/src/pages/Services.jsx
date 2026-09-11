import React from 'react';
import PageHeader from '../components/PageHeader';
import ServicesSection from '../components/ServicesSection';
import ContactSection from '../components/ContactSection';

const Services = () => (
  <>
    <PageHeader
      eyebrow="What We Offer"
      title="Cab & Tour Services from ISBT Una"
      description="Local rides, outstation drops, airport transfers and curated Himachal tours — all dispatched from our authorized ISBT Una counter."
    />
    <ServicesSection />
    <ContactSection showHeading={false} />
  </>
);

export default Services;
