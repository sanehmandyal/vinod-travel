import React from 'react';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import TourPackagesSection from '../components/TourPackagesSection';

const TourPackages = () => (
  <>
    <SEO
      title="Himachal Tour Packages from Una | Shimla, Manali, Dharamshala, Dalhousie"
      description="Book customizable Himachal holiday tour packages starting from Una. Covers Shimla & Kufri, Manali & Rohtang, Dharamshala & McLeodganj, Dalhousie & Khajjiar. Call +91 62305 21544."
      keywords={[
        'himachal tour packages from una',
        'shimla manali tour package',
        'dharamshala tour package',
        'dalhousie khajjiar package',
        'himachal holiday cabs',
        'himachal honeymoon taxi package',
      ]}
      canonical="/tour-packages"
    />
    <PageHeader
      eyebrow="Handcrafted Itineraries"
      title="Curated Himachal Tour Packages"
      description="Multi-day holiday packages across Shimla, Manali, Dharamshala and Dalhousie with experienced mountain drivers."
    />
    <TourPackagesSection showHeading={false} />
  </>
);

export default TourPackages;
