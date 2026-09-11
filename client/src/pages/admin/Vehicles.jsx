import React from 'react';
import AdminContentManager from '../../components/AdminContentManager';
import { vehicleApi } from '../../api';

const fields = [
  { key: 'name', label: 'Vehicle Name', type: 'text', required: true },
  { key: 'category', label: 'Category (Sedan / SUV / Luxury MPV / Group Transit)', type: 'text', required: true },
  { key: 'seatingCapacity', label: 'Seating Capacity', type: 'text', required: true },
  { key: 'description', label: 'Description', type: 'textarea', required: true },
  { key: 'features', label: 'Features (comma separated)', type: 'tags' },
  { key: 'ratePerKm', label: 'Rate per Km (optional — internal note only, not shown on website)', type: 'text' },
  { key: 'image', label: 'Vehicle Photo', type: 'image' },
  { key: 'order', label: 'Display Order', type: 'number', default: 0 },
  { key: 'featured', label: 'Featured / Customer Choice', type: 'checkbox' },
  { key: 'active', label: 'Visible on Website', type: 'checkbox', default: true },
];

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'category', label: 'Category' },
  { key: 'seatingCapacity', label: 'Seating' },
];

const Vehicles = () => <AdminContentManager title="Fleet / Vehicles" api={vehicleApi} fields={fields} columns={columns} />;

export default Vehicles;
