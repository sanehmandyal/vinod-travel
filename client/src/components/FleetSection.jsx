import React from 'react';
import Icon from './Icon';
import SectionHeading from './SectionHeading';
import { useContent, useSettings } from '../hooks';
import { vehicleApi } from '../api';
import { fallbackVehicles, waLink } from '../data/siteConfig';
import { getVehicleImage } from '../utils/media';

const FleetSection = ({ limit, showHeading = true }) => {
  const { data: vehicles } = useContent(vehicleApi.list, fallbackVehicles);
  const { data: settings } = useSettings();
  const list = limit ? vehicles.slice(0, limit) : vehicles;

  return (
    <section className="w-full py-20 lg:py-28 bg-slate-50/80" id="fleet">
      <div className="max-w-max-width-content mx-auto px-gutter-mobile lg:px-gutter-desktop space-y-12">
        {showHeading && (
          <SectionHeading
            eyebrow="Handpicked, Clean & Mountain-Ready"
            title="Choose Your Ride"
            description="Every vehicle is thoroughly inspected before departure — spotless interiors, chilled AC, and licensed Himachal hill drivers."
          />
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {list.map((v) => (
            <div
              key={v._id}
              className={`bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${
                v.featured ? 'ring-2 ring-amber-400/60 shadow-lg' : ''
              }`}
            >
              <div>
                <div className="relative h-52 w-full overflow-hidden bg-slate-100 group/img">
                  <img
                    src={getVehicleImage(v)}
                    alt={v.name}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      const name = (v?.name || '').toLowerCase();
                      if (name.includes('ertiga')) e.currentTarget.src = '/images/vehicles/ertiga.jpg';
                      else if (name.includes('tempo')) e.currentTarget.src = '/images/vehicles/tempo.jpg';
                      else if (name.includes('dzire')) e.currentTarget.src = '/images/vehicles/dzire.jpg';
                      else e.currentTarget.src = '/images/vehicles/innova.jpg';
                    }}
                  />
                  {v.featured && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-900 font-bold text-xs shadow-md">
                        ★ Customer Choice
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 z-10">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white font-semibold text-xs shadow-sm">
                      {v.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-title-lg text-lg text-slate-900 font-bold">{v.name}</h3>
                    <span className="font-bold text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 shrink-0">
                      {v.seatingCapacity}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed min-h-[36px]">{v.description}</p>

                  <div className="flex items-center gap-2 text-xs text-slate-600 pt-2 flex-wrap border-t border-slate-100">
                    {v.features?.map((f) => (
                      <span key={f} className="inline-flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200/60 text-[11px] font-medium text-slate-700">
                        <Icon name="check_circle" className="text-[14px] text-emerald-600" /> {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">Estimated Fare</span>
                  <span className="text-xs font-bold text-emerald-700">Contact for Best Price</span>
                </div>
                <a
                  href={waLink(`Booking inquiry for ${v.name} from ISBT Una`, settings.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all shadow-sm ${
                    v.featured
                      ? 'bg-secondary text-on-secondary hover:bg-secondary-fixed hover:text-on-secondary-fixed hover:shadow-md'
                      : 'bg-primary text-white hover:bg-secondary'
                  }`}
                >
                  Book on WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
              <Icon name="assignment_turned_in" className="text-[24px]" />
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              <strong className="text-slate-900 font-bold">Transparent Fleet Policy:</strong> Vehicle plate number, clean interior photos, and
              driver contact are shared directly on WhatsApp 2 hours prior to scheduled departure.
            </p>
          </div>
          <a
            href={waLink('I need custom fleet sizing for a group trip from Una', settings.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs whitespace-nowrap transition-colors"
          >
            <span>Need Custom Group Fleet?</span>
            <Icon name="call" className="text-[16px] text-secondary" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FleetSection;
