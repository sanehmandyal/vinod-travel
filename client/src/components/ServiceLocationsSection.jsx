import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import SectionHeading from './SectionHeading';
import { locations } from '../data/locationData';
import { waLink } from '../data/siteConfig';
import { useSettings } from '../hooks';

const ServiceLocationsSection = () => {
  const { data: settings } = useSettings();

  return (
    <section className="w-full py-20 lg:py-28 bg-white border-y border-slate-200/80" id="locations">
      <div className="max-w-max-width-content mx-auto px-gutter-mobile lg:px-gutter-desktop space-y-12">
        <SectionHeading
          eyebrow="Regional Reach & Station Desks"
          title="Major Taxi Hubs & Service Areas"
          description="Dedicated counter desks and rapid 24/7 platform reporting across Himachal Pradesh and Punjab border corridors. Choose your pickup location for local fares and instant booking."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {locations.map((loc) => {
            const topRoute = loc.routes[0];
            return (
              <div
                key={loc.id}
                className="bg-slate-50/80 rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Top Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 text-primary">
                      {loc.badge}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon name="local_taxi" className="text-[18px]" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                      <Link to={`/${loc.slug}`}>{loc.shortName} Taxi Service</Link>
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {loc.subheadline}
                    </p>
                  </div>

                  {/* Key Hubs list */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Popular Pickup Points:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {loc.hubs.slice(0, 3).map((h, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-slate-700 font-medium"
                        >
                          {h.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Route highlight */}
                  {topRoute && (
                    <div className="p-3 rounded-2xl bg-white border border-slate-200/80 text-xs flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-slate-800">{topRoute.destination}</div>
                        <div className="text-[11px] text-slate-500">{topRoute.distance} • {topRoute.duration}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-emerald-700">{topRoute.sedanFare}</div>
                        <div className="text-[10px] text-slate-400">Sedan approx</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center justify-between gap-3">
                  <Link
                    to={`/${loc.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:text-secondary transition-colors"
                  >
                    <span>View All Routes &amp; Fares</span>
                    <Icon name="arrow_forward" className="text-[14px] group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <a
                    href={waLink(
                      `Hello Vinod Travels, I need a taxi from ${loc.shortName}.`,
                      settings.whatsapp
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
                    title={`WhatsApp Booking for ${loc.shortName}`}
                  >
                    <Icon name="chat" className="text-[16px]" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceLocationsSection;
