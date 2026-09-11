import React from 'react';
import PageHeader from '../components/PageHeader';
import DestinationsSection from '../components/DestinationsSection';

const Destinations = () => (
  <>
    <PageHeader
      eyebrow="Popular Routes from ISBT Una"
      title="Where Can We Take You?"
      description="Fixed fare quotes, hill permits handled, and punctual doorstep pickup throughout District Una and beyond."
    />
    <DestinationsSection showHeading={false} />
  </>
);

export default Destinations;
