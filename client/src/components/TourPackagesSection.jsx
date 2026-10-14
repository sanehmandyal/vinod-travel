import React from 'react';
import Icon from './Icon';
import SectionHeading from './SectionHeading';
import { useContent, useSettings } from '../hooks';
import { tourPackageApi } from '../api';
import { fallbackTourPackages, waLink } from '../data/siteConfig';
import { getTourPackageImage } from '../utils/media';

const TourPackagesSection = ({ limit, showHeading = true }) => {
  const { data: packages } = useContent(tourPackageApi.list, fallbackTourPackages);
  const { data: settings } = useSettings();
  const list = limit ? packages.slice(0, limit) : packages;

  return (
    <section className="w-full py-20 lg:py-28 bg-slate-50/70" id="tour-packages">
      <div className="max-w-max-width-content mx-auto px-gutter-mobile lg:px-gutter-desktop space-y-12">
        {showHeading && (
          <SectionHeading
            eyebrow="Handcrafted Mountain Holidays"
            title="Curated Himachal Tour Packages"
            description="Explore the crown jewels of the Himalayas with dedicated holiday cabs, flexible daily stops, and zero rush."
            action={
              <a
                href={waLink('Hello Vinod Travels, I want to customize a Himachal tour package', settings.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-white font-semibold text-xs hover:bg-secondary transition-all shadow-sm hover:shadow-md"
              >
                <Icon name="edit_calendar" className="text-[18px]" />
                <span>Customize Itinerary</span>
              </a>
            }
          />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {list.map((t) => (
            <div
              key={t._id}
              className="rounded-3xl bg-white border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-52 relative overflow-hidden bg-slate-100 group/img">
                  <img
                    src={getTourPackageImage(t)}
                    alt={t.title}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      const title = (t?.title || '').toLowerCase();
                      if (title.includes('manali')) e.currentTarget.src = '/images/destinations/manali.jpg';
                      else e.currentTarget.src = '/images/destinations/shimla.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-bold text-xs shadow-sm">
                    {t.duration}
                  </span>
                  <span className="absolute bottom-3 left-3 text-xs font-bold text-amber-300 drop-shadow-md">
                    {t.tagline}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <h3 className="font-title-lg text-lg text-slate-900 font-bold">{t.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed min-h-[48px]">{t.description}</p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                  <Icon name="explore" className="text-secondary text-[16px]" />
                  <span>Custom Itinerary</span>
                </div>
                <a
                  href={waLink(`Inquiry for ${t.title} (${t.duration}) from Una`, settings.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-white hover:bg-secondary transition-all font-bold text-xs shadow-sm hover:shadow-md"
                >
                  <span>Plan Trip</span>
                  <Icon name="arrow_forward" className="text-[14px]" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TourPackagesSection;
