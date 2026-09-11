import React from 'react';
import Icon from './Icon';
import SectionHeading from './SectionHeading';
import { services, waLink } from '../data/siteConfig';
import { useSettings } from '../hooks';

const ServicesSection = () => {
  const { data: settings } = useSettings();
  return (
  <section className="w-full py-20 lg:py-28 bg-white" id="services">
    <div className="max-w-max-width-content mx-auto px-gutter-mobile lg:px-gutter-desktop space-y-12">
      <SectionHeading
        eyebrow="What We Offer • ISBT Una Desk"
        title="Dedicated Cab & Tour Services for Every Mountain Journey"
        description="Whether you need a quick station pick-up or an extended high-altitude Himalayan road trip, our fleet operates round the clock with seasoned hill drivers."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {services.map((s) => (
          <div
            key={s.title}
            className={`rounded-3xl p-7 flex flex-col justify-between border transition-all duration-300 group hover:-translate-y-1 ${
              s.highlight
                ? 'bg-[#031c14] text-white border-emerald-800 shadow-xl relative overflow-hidden'
                : 'bg-slate-50/60 hover:bg-white border-slate-200/80 shadow-sm hover:shadow-xl'
            }`}
          >
            {s.highlight && (
              <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-amber-400/15 rounded-full blur-3xl" />
            )}
            <div className="relative space-y-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors shadow-sm ${
                  s.highlight
                    ? 'bg-emerald-900/80 text-amber-300 border border-emerald-700'
                    : 'bg-white text-slate-800 border border-slate-200 group-hover:bg-primary group-hover:text-white'
                }`}
              >
                <Icon name={s.icon} className="text-[28px]" />
              </div>
              <div className="space-y-1">
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider block ${
                    s.highlight ? 'text-amber-300' : 'text-amber-700'
                  }`}
                >
                  {s.subtitle}
                </span>
                <h3 className={`font-title-lg text-lg font-bold ${s.highlight ? 'text-white' : 'text-slate-900'}`}>
                  {s.title}
                </h3>
              </div>
              <p
                className={`text-xs leading-relaxed ${
                  s.highlight ? 'text-emerald-100/80' : 'text-slate-600'
                }`}
              >
                {s.description}
              </p>
              <ul
                className={`space-y-2 text-xs pt-3 border-t ${
                  s.highlight ? 'border-emerald-800/80 text-emerald-100/90' : 'border-slate-200/80 text-slate-600'
                }`}
              >
                {s.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2">
                    <Icon
                      name="check_circle"
                      className={`text-[15px] shrink-0 ${s.highlight ? 'text-amber-300' : 'text-emerald-600'}`}
                    />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-6 relative">
              <a
                href={waLink(`Hello Vinod Travels, I need ${s.title} from Una`, settings.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 font-bold text-xs transition-colors ${
                  s.highlight ? 'text-amber-300 hover:text-amber-200' : 'text-primary group-hover:text-amber-700'
                }`}
              >
                <span>Book Service</span>
                <Icon name="arrow_forward" className="text-[16px]" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default ServicesSection;
