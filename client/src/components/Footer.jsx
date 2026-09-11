import React from 'react';
import Icon from './Icon';
import { quickLinks, popularRouteLinks, fleetHighlights, waLink } from '../data/siteConfig';
import { useSettings } from '../hooks';

const Footer = () => {
  const { data: settings } = useSettings();
  return (
  <footer className="w-full bg-surface-container-low text-on-surface pt-space-3xl pb-space-xl">
    <div className="max-w-max-width-content mx-auto px-gutter-mobile lg:px-gutter-desktop">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-2xl pb-space-2xl">
        <div className="lg:col-span-2 space-y-space-md">
          <div className="flex items-center gap-space-sm">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-secondary-fixed shrink-0">
              <Icon name="directions_car" className="text-[18px]" />
            </div>
            <span className="font-headline-sm text-headline-sm text-primary">{settings.businessName || settings.name}</span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Premium passenger transit and curated mountain holiday itineraries rooted in authentic
            Himachali hospitality. Serving pilgrims, leisure tourists, business travelers, and
            outstation passengers across North India with trusted, veteran hill drivers.
          </p>
          <div className="inline-flex items-center gap-2 px-space-md py-1.5 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm">
            <Icon name="verified" className="text-[16px] text-secondary" />
            <span>Authorized Taxi Operator at ISBT Una Counter</span>
          </div>
          <div className="space-y-space-xs pt-space-xs text-body-sm font-body-sm text-on-surface-variant">
            <div className="flex items-start gap-2">
              <Icon name="pin_drop" className="text-[18px] text-primary mt-0.5" />
              <span>{settings.fullAddress}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="call" className="text-[18px] text-primary" />
              <span>
                Direct Dispatch Desk: {settings.phonePrimary}{settings.phoneSecondary ? ` / ${settings.phoneSecondary}` : ''}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="mail" className="text-[18px] text-primary" />
              <span>{settings.email}</span>
            </div>
          </div>
        </div>

        <div className="space-y-space-md">
          <h3 className="font-title-lg text-title-lg text-primary tracking-tight">Quick Links</h3>
          <ul className="space-y-space-xs font-body-sm text-body-sm">
            {quickLinks.map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors">
                <Icon name="chevron_right" className="text-[14px] text-secondary" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-space-md">
          <h3 className="font-title-lg text-title-lg text-primary tracking-tight">Popular Routes</h3>
          <ul className="space-y-space-xs font-body-sm text-body-sm">
            {popularRouteLinks.map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors">
                <Icon name="navigation" className="text-[14px] text-secondary" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-space-md">
          <h3 className="font-title-lg text-title-lg text-primary tracking-tight">Our Fleet</h3>
          <ul className="space-y-space-xs font-body-sm text-body-sm">
            {fleetHighlights.map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors">
                <Icon name="local_taxi" className="text-[14px] text-secondary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="py-space-md px-space-lg rounded-xl bg-surface-container flex flex-col md:flex-row items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-sm text-body-sm font-body-sm text-on-surface-variant">
          <Icon name="shield_with_heart" className="text-secondary text-[22px]" />
          <span>
            <strong>Trust Guarantee:</strong> All bookings confirmed directly via verified dispatch
            operator at ISBT Una. Includes all state taxes, hill permits, driver allowances &amp;
            passenger insurance.
          </span>
        </div>
        <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider bg-surface-container-highest px-space-sm py-1 rounded-full whitespace-nowrap">
          H.P. Govt. Approved Fleet
        </span>
      </div>

      <div className="pt-8 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500 border-t border-slate-200/80">
        <p>© {new Date().getFullYear()} {settings.businessName || settings.name}. Regd. Desk: {settings.location}. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <span className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</span>
          <span className="hover:text-primary transition-colors cursor-pointer">Terms &amp; Fare Policies</span>
          <span className="hover:text-primary transition-colors cursor-pointer">Safety Protocols</span>
        </div>
      </div>
    </div>
  </footer>
  );
};

export const WhatsAppFloatButton = () => {
  const { data: settings } = useSettings();
  return (
    <a
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2.5 px-space-lg py-3.5 rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg shadow-[0_16px_36px_-6px_rgba(15,41,34,0.4)] hover:bg-tertiary-container hover:text-on-tertiary hover:scale-105 transition-all"
      href={waLink('Hello Vinod Tour and Travels, I need a cab quote.', settings.whatsapp)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon name="chat" className="text-[24px] text-tertiary-fixed" />
      <div className="flex flex-col text-left">
        <span className="text-[11px] leading-3 text-tertiary-fixed-dim uppercase tracking-wider">
          {settings.location || 'ISBT Una 24x7 Desk'}
        </span>
        <span className="leading-none font-bold">Book on WhatsApp</span>
      </div>
    </a>
  );
};

export default Footer;
