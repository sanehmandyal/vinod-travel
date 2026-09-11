import React from 'react';
import Icon from './Icon';
import SectionHeading from './SectionHeading';
import { useContent, useSettings } from '../hooks';
import { destinationApi } from '../api';
import { fallbackDestinations, waLink } from '../data/siteConfig';
import { getDestinationImage } from '../utils/media';

const DestinationsSection = ({ limit, showHeading = true }) => {
  const { data: destinations } = useContent(destinationApi.list, fallbackDestinations);
  const { data: settings } = useSettings();
  const list = limit ? destinations.slice(0, limit) : destinations;

  return (
    <section className="w-full py-20 lg:py-28 bg-white" id="destinations">
      <div className="max-w-max-width-content mx-auto px-gutter-mobile lg:px-gutter-desktop space-y-12">
        {showHeading && (
          <SectionHeading
            eyebrow="Popular Routes from ISBT Una"
            title="Where Can We Take You?"
            description="Fixed fare quotes, state hill permits handled, and punctual doorstep pickup throughout District Una and beyond."
            action={
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
                <Icon name="route" className="text-emerald-600 text-[18px]" />
                <span>All NH / SH Tolls &amp; State Border Taxes Pre-Calculated</span>
              </div>
            }
          />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {list.map((d) => (
            <div
              key={d._id}
              className="rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div className="h-52 w-full overflow-hidden bg-slate-100 relative group/img">
                  <img
                    src={getDestinationImage(d)}
                    alt={d.to}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      const to = (d?.to || '').toLowerCase();
                      if (to.includes('manali')) e.currentTarget.src = '/images/destinations/manali.jpg';
                      else e.currentTarget.src = '/images/destinations/shimla.jpg';
                    }}
                  />
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-bold text-xs shadow-sm">
                      {d.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 z-10">
                    <span className="px-3 py-1 rounded-full bg-emerald-700/90 backdrop-blur-md text-white font-bold text-xs shadow-sm flex items-center gap-1">
                      <Icon name="speed" className="text-[14px]" /> {d.durationLabel}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                      <span className="inline-flex items-center gap-1 font-bold text-amber-700">
                        <Icon name="straighten" className="text-[14px]" /> {d.distanceKm} km distance
                      </span>
                      <span className="text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-md">
                        Direct Route
                      </span>
                    </div>

                    <h3 className="font-title-lg text-lg text-slate-900 font-bold flex items-center gap-2 flex-wrap">
                      <span>{d.from || 'Una'}</span>
                      <Icon name="trending_flat" className="text-secondary text-[20px]" />
                      <span className="text-primary">{d.to}</span>
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed min-h-[36px]">{d.description}</p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">Fare Quote</span>
                  <span className="text-xs font-bold text-emerald-700">Contact for Best Price</span>
                </div>
                <div className="flex items-center gap-2">
                  {d.mapLink && (
                    <a
                      href={d.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-secondary hover:text-white transition-all text-slate-700 shadow-sm"
                      aria-label="View on map"
                      title="View route map"
                    >
                      <Icon name="pin_drop" className="text-[18px]" />
                    </a>
                  )}
                  <a
                    href={waLink(`I need a cab quote from Una to ${d.to}`, settings.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-white hover:bg-secondary transition-all font-bold text-xs shadow-sm hover:shadow-md"
                  >
                    <span>Book Route</span>
                    <Icon name="arrow_forward" className="text-[16px]" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
