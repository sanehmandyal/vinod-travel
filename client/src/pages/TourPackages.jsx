import React from 'react';
import PageHeader from '../components/PageHeader';
import TourPackagesSection from '../components/TourPackagesSection';

const TourPackages = () => (
  <>
    <PageHeader
      eyebrow="Handcrafted Itineraries"
      title="Curated Himachal Tour Packages"
      description="Multi-day holiday packages across Shimla, Manali, Dharamshala and Dalhousie with experienced mountain drivers."
    />
    <TourPackagesSection showHeading={false} />
  </>
);

export default TourPackages;
