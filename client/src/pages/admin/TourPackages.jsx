import React from 'react';
import AdminContentManager from '../../components/AdminContentManager';
import { tourPackageApi } from '../../api';

const fields = [
  { key: 'title', label: 'Package Title', type: 'text', required: true },
  { key: 'tagline', label: 'Tagline (e.g. Queen of Hills)', type: 'text', required: true },
  { key: 'duration', label: 'Duration (e.g. 3 Days / 2 Nights)', type: 'text', required: true },
  { key: 'description', label: 'Description', type: 'textarea', required: true },
  { key: 'price', label: 'Price (optional — internal note only, not shown on website)', type: 'text' },
  { key: 'priceNote', label: 'Price Note', type: 'text', default: 'total' },
  { key: 'image', label: 'Package Photo', type: 'image' },
  { key: 'order', label: 'Display Order', type: 'number', default: 0 },
  { key: 'active', label: 'Visible on Website', type: 'checkbox', default: true },
];

const columns = [
  { key: 'title', label: 'Package' },
  { key: 'tagline', label: 'Tagline' },
  { key: 'duration', label: 'Duration' },
];

const TourPackages = () => (
  <AdminContentManager title="Tour Packages" api={tourPackageApi} fields={fields} columns={columns} />
);

export default TourPackages;
