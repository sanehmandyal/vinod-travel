import React from 'react';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import DestinationsSection from '../components/DestinationsSection';

const Destinations = () => (
  <>
    <SEO
      title="Popular Cab Routes from Una | Chandigarh, Delhi, Shimla, Manali"
      description="Top outstation cab routes from Una to Chandigarh Airport, Delhi NCR, Shimla, Manali, Dharamshala, Chintpurni & Dalhousie. Book online or call +91 62305 21544."
      keywords={[
        'una to chandigarh taxi',
        'una to delhi cab',
        'una to shimla taxi',
        'una to manali cab',
        'una to dharamshala cab',
        'chintpurni taxi service',
        'outstation cab booking himachal',
      ]}
      canonical="/destinations"
    />
    <PageHeader
      eyebrow="Popular Routes from ISBT Una"
      title="Where Can We Take You?"
      description="Doorstep and station pickup, state hill permits handled, and seasoned mountain drivers for trips across North India."
    />
    <DestinationsSection showHeading={false} />
  </>
);

export default Destinations;
