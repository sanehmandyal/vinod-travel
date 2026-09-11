import React from 'react';
import Icon from './Icon';
import SectionHeading from './SectionHeading';
import { whyChooseUs } from '../data/siteConfig';

const WhyChooseUsSection = () => (
  <section className="w-full py-20 lg:py-28 bg-slate-50/80 text-on-surface" id="why-choose-us">
    <div className="max-w-max-width-content mx-auto px-gutter-mobile lg:px-gutter-desktop space-y-12">
      <SectionHeading
        eyebrow="Uncompromising Standards"
        title="Why Discerning Travelers Choose Vinod Tour & Travels"
        description={`We operate with deep pride in Himachal Pradesh's tradition of warm hospitality ("Atithi Devo Bhava") combined with stringent hill driving and vehicle safety protocols.`}
        align="start"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {whyChooseUs.map((item) => (
          <div
            key={item.num}
            className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 space-y-4 relative overflow-hidden group"
          >
            <span className="text-6xl font-black text-slate-100 absolute top-4 right-6 select-none group-hover:text-amber-100 transition-colors">
              {item.num}
            </span>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-secondary">
              <Icon name={item.icon} className="text-[26px]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-title-lg text-lg text-slate-900 font-bold">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUsSection;
