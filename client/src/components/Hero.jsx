import React from 'react';
import Icon from './Icon';
import { waLink } from '../data/siteConfig';
import { useSettings } from '../hooks';

const trustPillars = [
  { icon: 'schedule', title: '24/7 Service', sub: 'Always available at ISBT' },
  { icon: 'sanitizer', title: 'Sanitized Cabs', sub: 'Fresh & spotless interiors' },
  { icon: 'terrain', title: 'Hill Drivers', sub: '10+ yrs mountain mastery' },
  { icon: 'currency_rupee', title: 'Zero Surprises', sub: 'Transparent fare policy' },
];

const Hero = () => {
  const { data: settings } = useSettings();
  return (
    <section className="relative w-full overflow-hidden bg-primary text-on-primary">
      {/* Background with real mountain imagery */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=85"
          alt="Himachal Mountains"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#03150e]/95 via-[#03150e]/85 to-[#03150e]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#03150e] via-transparent to-black/30" />
      </div>

      <div className="relative z-10 max-w-max-width-content mx-auto px-gutter-mobile lg:px-gutter-desktop pt-10 sm:pt-14 lg:pt-16 pb-20 sm:pb-24 lg:pb-28 flex flex-col justify-between min-h-[600px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-lg">
              <span className="flex items-center text-secondary-fixed text-[14px]">
                {['star', 'star', 'star', 'star', 'star_half'].map((s, i) => (
                  <Icon key={i} name={s} className="text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }} />
                ))}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed" />
              <span className="font-label-sm text-label-sm text-primary-fixed tracking-wider uppercase">
                ISBT UNA COUNTER • {settings.rating}/5 RATED TAXI SERVICE
              </span>
              <Icon name="verified" className="text-secondary-fixed text-[16px]" />
            </div>

            <h1 className="font-display-hero text-display-hero-mobile lg:text-display-hero tracking-tight text-white font-bold drop-shadow-md leading-tight">
              Travel Himachal. <br />
              <span className="italic text-secondary-fixed font-normal">Travel in Comfort &amp; Safety.</span>
            </h1>

            <p className="font-body-lg text-body-lg text-emerald-100/90 max-w-2xl leading-relaxed text-base sm:text-lg">
              Authorized cab services directly dispatched from ISBT Una counter. Outstation journeys,
              Chandigarh &amp; Delhi airport transfers, pilgrimage darshan, and curated Himachal holiday tours
              with experienced hill drivers.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#booking-card"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-secondary text-on-secondary font-label-lg text-label-lg shadow-xl hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-all hover:scale-105"
              >
                <Icon name="local_taxi" className="text-[20px]" />
                <span>Book a Cab Now</span>
              </a>
              <a
                href={waLink('Hello Vinod Tour and Travels, I need a cab quote from ISBT Una.', settings.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-emerald-600 text-white font-label-lg text-label-lg shadow-lg hover:bg-emerald-500 transition-all hover:scale-105"
              >
                <Icon name="chat" className="text-[20px]" />
                <span>WhatsApp Quote</span>
              </a>
              <a
                href={`tel:${settings.phonePrimary.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-label-lg text-label-lg hover:bg-white/20 transition-all"
              >
                <Icon name="call" className="text-[18px] text-secondary-fixed" />
                <span>Call Dispatch Desk</span>
              </a>
            </div>
          </div>

          {/* Right Highlight Box */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-7 text-white shadow-2xl space-y-5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-secondary text-on-secondary text-xs font-bold uppercase tracking-wider">
                  ISBT Una Counter Desk
                </span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-300 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Live Dispatch Available
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="font-title-lg text-xl font-bold text-white">Direct Mountain Transit</h3>
                <p className="text-sm text-emerald-100/80 leading-relaxed">
                  Avoid middlemen &amp; surge pricing. Book clean AC sedans, Innova Crystas, and tempo travellers
                  with licensed Himachal drivers who know every mountain pass.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10">
                  <div className="text-secondary-fixed font-bold text-lg">10+ Years</div>
                  <div className="text-xs text-emerald-200/80">Hill Driving Mastery</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10">
                  <div className="text-secondary-fixed font-bold text-lg">24x7 Ready</div>
                  <div className="text-xs text-emerald-200/80">Doorstep &amp; Station</div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-emerald-200/90 border-t border-white/10">
                <span>📍 ISBT Una Counter No. 1</span>
                <span>⭐ 4.8/5 (24+ Google Reviews)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust pillars row */}
        <div className="pt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustPillars.map((p) => (
            <div
              key={p.title}
              className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center gap-3 text-white/95"
            >
              <div className="w-10 h-10 rounded-xl bg-secondary/20 border border-secondary/30 flex items-center justify-center text-secondary-fixed shrink-0">
                <Icon name={p.icon} className="text-[22px]" />
              </div>
              <div>
                <div className="font-title-md text-sm sm:text-base font-bold text-white leading-tight">{p.title}</div>
                <div className="text-xs text-emerald-200/80 pt-0.5">{p.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
