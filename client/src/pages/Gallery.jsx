import React from 'react';
import PageHeader from '../components/PageHeader';
import GallerySection from '../components/GallerySection';

const Gallery = () => (
  <>
    <PageHeader
      eyebrow="Moments on the Road"
      title="Travel Memories Across Himachal"
      description="A glimpse into our passenger journeys across mountain valleys, alpine highways, and sacred shrines."
    />
    <GallerySection showHeading={false} />
  </>
);

export default Gallery;
