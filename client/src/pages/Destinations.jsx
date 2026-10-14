import React from 'react';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import DestinationsSection from '../components/DestinationsSection';

const Destinations = () => (
  <>
    <SEO
      title="Popular Cab Routes & Fares from Una | Chandigarh, Delhi, Shimla, Manali"
      description="View fixed transparent taxi fares from Una to Chandigarh Airport, Delhi NCR, Shimla, Manali, Dharamshala, Chintpurni & Dalhousie. Book online or call +91 62305 21544."
      keywords={[
        'una to chandigarh taxi fare',
        'una to delhi cab',
        'una to shimla taxi',
        'una to manali taxi fare',
        'una to dharamshala cab',
        'chintpurni taxi fare',
        'outstation taxi rates himachal',
      ]}
      canonical="/destinations"
    />
    <PageHeader
      eyebrow="Popular Routes from ISBT Una"
      title="Where Can We Take You?"
      description="Fixed fare quotes, hill permits handled, and punctual doorstep pickup throughout District Una and beyond."
    />
    <DestinationsSection showHeading={false} />
  </>
);

export default Destinations;
