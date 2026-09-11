import React from 'react';
import AdminContentManager from '../../components/AdminContentManager';
import { destinationApi } from '../../api';

const fields = [
  { key: 'from', label: 'From', type: 'text', default: 'Una' },
  { key: 'to', label: 'To (Destination)', type: 'text', required: true },
  { key: 'distanceKm', label: 'Distance (km)', type: 'number', required: true },
  { key: 'durationLabel', label: 'Duration Label (e.g. ~4.5 hrs)', type: 'text', required: true },
  { key: 'tag', label: 'Tag (e.g. Mountain Scenic)', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea', required: true },
  { key: 'image', label: 'Destination Photo', type: 'image' },
  { key: 'mapLink', label: 'Google Maps Link (optional)', type: 'text', placeholder: 'https://maps.google.com/?q=...' },
  { key: 'approxFare', label: 'Approx Fare (optional — internal note only, not shown on website)', type: 'text' },
  { key: 'fareLabel', label: 'Fare Label', type: 'text', default: 'Approx. Sedan Fare' },
  { key: 'order', label: 'Display Order', type: 'number', default: 0 },
  { key: 'active', label: 'Visible on Website', type: 'checkbox', default: true },
];

const columns = [
  { key: 'to', label: 'Destination' },
  { key: 'distanceKm', label: 'Distance', render: (i) => `${i.distanceKm} km` },
  { key: 'durationLabel', label: 'Duration' },
];

const Destinations = () => (
  <AdminContentManager title="Routes / Destinations" api={destinationApi} fields={fields} columns={columns} />
);

export default Destinations;
