import React from 'react';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import GallerySection from '../components/GallerySection';

const Gallery = () => (
  <>
    <SEO
      title="Travel Gallery & Photo Moments | Vinod Tour & Travels Una"
      description="Explore our travel photo gallery: Mountain road trips across Shimla, Manali, Rohtang, Dalhousie, and pilgrimages to Chintpurni & Naina Devi."
      keywords={[
        'himachal travel photos',
        'vinod travels gallery',
        'shimla manali cab photos',
        'himachal road trip pictures',
      ]}
      canonical="/gallery"
    />
    <PageHeader
      eyebrow="Moments on the Road"
      title="Travel Memories Across Himachal"
      description="A glimpse into our passenger journeys across mountain valleys, alpine highways, and sacred shrines."
    />
    <GallerySection showHeading={false} />
  </>
);

export default Gallery;
