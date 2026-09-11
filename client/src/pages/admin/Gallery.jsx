import React from 'react';
import AdminContentManager from '../../components/AdminContentManager';
import { galleryApi } from '../../api';

const fields = [
  { key: 'caption', label: 'Caption', type: 'text', required: true },
  {
    key: 'category',
    label: 'Category',
    type: 'select',
    options: ['cabs', 'mountains', 'pilgrimage', 'tours', 'customers'],
    default: 'cabs',
  },
  { key: 'image', label: 'Photo', type: 'image', required: true },
  { key: 'order', label: 'Display Order', type: 'number', default: 0 },
  { key: 'active', label: 'Visible on Website', type: 'checkbox', default: true },
];

const columns = [
  { key: 'caption', label: 'Caption' },
  { key: 'category', label: 'Category' },
];

const Gallery = () => <AdminContentManager title="Gallery" api={galleryApi} fields={fields} columns={columns} />;

export default Gallery;
