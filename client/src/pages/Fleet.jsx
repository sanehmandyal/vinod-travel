import React from 'react';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import FleetSection from '../components/FleetSection';

const Fleet = () => (
  <>
    <SEO
      title="Our Fleet | Dzire, Ertiga, Innova Crysta & Tempo Traveller in Una"
      description="Choose from AC Sedan (Maruti Dzire), 6+1 Family SUV (Ertiga), Luxury Innova Crysta, and 12-17 Seater Tempo Travellers with veteran hill drivers. Call +91 62305 21544."
      keywords={[
        'car rental una',
        'innova crysta booking una',
        'tempo traveller in una himachal',
        'ertiga cab booking una',
        'dzire taxi una',
        'luxury cabs himachal',
      ]}
      canonical="/fleet"
    />
    <PageHeader
      eyebrow="Handpicked, Clean & Mountain-Ready"
      title="Our Fleet"
      description="From efficient sedans to spacious tempo travellers — every vehicle is inspected before every departure."
    />
    <FleetSection showHeading={false} />
  </>
);

export default Fleet;
