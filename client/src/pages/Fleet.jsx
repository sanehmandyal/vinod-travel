import React from 'react';
import PageHeader from '../components/PageHeader';
import FleetSection from '../components/FleetSection';

const Fleet = () => (
  <>
    <PageHeader
      eyebrow="Handpicked, Clean & Mountain-Ready"
      title="Our Fleet"
      description="From efficient sedans to spacious tempo travellers — every vehicle is inspected before every departure."
    />
    <FleetSection showHeading={false} />
  </>
);

export default Fleet;
