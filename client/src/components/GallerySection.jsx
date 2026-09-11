import React, { useState } from 'react';
import Icon from './Icon';
import SectionHeading from './SectionHeading';
import { useContent } from '../hooks';
import { galleryApi } from '../api';
import { fallbackGallery } from '../data/siteConfig';
import { getGalleryImage } from '../utils/media';

const filters = [
  { key: 'all', label: 'All Photos' },
  { key: 'cabs', label: 'Our Cabs' },
  { key: 'mountains', label: 'Passes & Snow' },
  { key: 'pilgrimage', label: 'Pilgrimage' },
];

const categoryIcon = {
  cabs: 'directions_car',
  mountains: 'landscape',
  pilgrimage: 'temple_hindu',
  tours: 'photo_camera',
  customers: 'groups',
};

const GallerySection = ({ limit, showHeading = true }) => {
  const { data: items } = useContent(galleryApi.list, fallbackGallery);
  const [active, setActive] = useState('all');

  const filtered = items.filter((g) => active === 'all' || g.category === active);
  const list = limit ? filtered.slice(0, limit) : filtered;

  return (
    <section className="w-full py-20 lg:py-28 bg-white" id="gallery">
      <div className="max-w-max-width-content mx-auto px-gutter-mobile lg:px-gutter-desktop space-y-12">
        {showHeading && (
          <SectionHeading
            eyebrow="Moments on the Road"
            title="Travel Memories Across Himachal"
            description="A glimpse into our passenger journeys across mountain valleys, alpine highways, snowy passes, and sacred shrines."
            action={
              <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-slate-100 border border-slate-200/80">
                {filters.map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setActive(f.key)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      active === f.key
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            }
          />
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {list.map((g, idx) => (
            <div
              key={g._id || idx}
              className="rounded-3xl overflow-hidden h-64 sm:h-72 relative group bg-slate-100 border border-slate-200/80 shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={getGalleryImage(g, idx)}
                alt={g.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity p-5 flex flex-col justify-end">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  {g.category}
                </span>
                <span className="font-title-md text-sm font-semibold text-white pt-1">{g.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
