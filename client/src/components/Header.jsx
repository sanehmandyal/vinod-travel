import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Icon from './Icon';
import { navLinks, waLink } from '../data/siteConfig';
import { useSettings } from '../hooks';

const headerLocations = [
  { label: 'Una (ISBT & Railway Station)', to: '/taxi-service-in-una', desc: 'Direct bus stand & station pickups' },
  { label: 'Amb Andaura (Vande Bharat)', to: '/taxi-service-in-amb-andaura', desc: 'Platform pickup for Train 22447/22448' },
  { label: 'Nangal Dam & Station', to: '/taxi-service-in-nangal', desc: 'Cabs to Una, Naina Devi & Chandigarh' },
  { label: 'Anandpur Sahib (Holy City)', to: '/taxi-service-in-anandpur-sahib', desc: 'Takht Kesgarh Sahib & Virasat-e-Khalsa' },
  { label: 'Dharamshala & McLeodganj', to: '/taxi-service-in-dharamshala', desc: 'Kangra valley & HPCA Stadium cabs' },
  { label: 'Gaggal Airport (Kangra IXG)', to: '/taxi-service-in-gagal-airport', desc: 'Direct flight arrival gate pickups' },
  { label: 'Daulatpur Chowk Station', to: '/taxi-service-in-daulatpur-chowk', desc: 'Northern terminus for Chintpurni & Talwara' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const { data: settings } = useSettings();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,19,13,0.06)] border-b border-slate-100">
      {/* Top utility bar */}
      <div className="bg-primary text-on-primary py-space-2xs px-gutter-mobile lg:px-gutter-desktop">
        <div className="max-w-max-width-content mx-auto flex flex-wrap items-center justify-between gap-y-1 text-label-sm font-label-sm">
          <div className="flex flex-wrap items-center gap-space-md">
            <span className="flex items-center gap-1 text-primary-fixed">
              <Icon name="location_on" className="text-[15px] text-secondary-fixed" />
              Office: Counter at {settings.location} (174303)
            </span>
            <span className="hidden sm:inline-block text-outline-variant">•</span>
            <span className="flex items-center gap-1 text-on-primary">
              <Icon name="star" className="text-[15px] text-secondary-fixed" />
              {settings.rating}/5 Rating ({settings.reviewCount} Verified Reviews)
            </span>
            <span className="hidden md:inline-block text-outline-variant">•</span>
            <span className="hidden md:flex items-center gap-1 text-primary-fixed-dim">
              <Icon name="schedule" className="text-[15px]" />
              24x7 Cab Support &amp; Advance Bookings
            </span>
          </div>
          <div className="flex items-center gap-3 md:gap-4 ml-auto">
            <a
              className="flex items-center gap-1 text-secondary-fixed hover:text-secondary-fixed-dim transition-colors"
              href={`tel:${settings.phonePrimary.replace(/\s/g, '')}`}
            >
              <Icon name="call" className="text-[15px]" /> Quick Dial
            </a>
            <span className="text-outline-variant">|</span>
            <a
              className="hidden sm:flex items-center gap-1 text-tertiary-fixed-dim hover:text-tertiary-fixed transition-colors"
              href={waLink('', settings.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="chat" className="text-[15px]" /> WhatsApp Quote
            </a>
            <span className="hidden sm:inline text-outline-variant">|</span>
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-all shadow-sm"
              title="Admin Portal Login"
            >
              <Icon name="admin_panel_settings" className="text-[14px]" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="min-h-20 max-w-max-width-content mx-auto px-gutter-mobile lg:px-gutter-desktop py-3 flex items-center justify-between gap-2 sm:gap-4">
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
          <img
            src="/logo-sm.png"
            alt={settings.businessName || 'Vinod Tour and Travels'}
            width="44"
            height="44"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover shrink-0 shadow-md ring-2 ring-secondary/30 group-hover:scale-105 group-hover:ring-secondary transition-all"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-headline-sm text-base sm:text-lg font-bold text-primary tracking-tight group-hover:text-secondary transition-colors truncate">
              {settings.businessName || settings.name}
            </span>
            <span className="hidden sm:block font-label-sm text-[10px] sm:text-[11px] text-on-surface-variant tracking-wider uppercase truncate">
              ISBT Una • Himachal Pradesh
            </span>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-3 2xl:gap-4.5">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-[13px] 2xl:text-[14px] font-semibold tracking-tight py-1 transition-all whitespace-nowrap ${
                  isActive
                    ? 'text-secondary font-bold border-b-2 border-secondary'
                    : 'text-slate-700 hover:text-primary hover:font-bold'
                }`
              }
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}

          {/* Taxi Hubs Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setLocationsOpen(true)}
            onMouseLeave={() => setLocationsOpen(false)}
          >
            <button
              type="button"
              onClick={() => setLocationsOpen((v) => !v)}
              className="inline-flex items-center gap-1 text-[13px] 2xl:text-[14px] font-semibold text-slate-700 hover:text-primary hover:font-bold py-1 transition-all whitespace-nowrap"
            >
              <span>Taxi Hubs</span>
              <Icon name={locationsOpen ? 'expand_less' : 'expand_more'} className="text-[16px] text-secondary" />
            </button>

            {locationsOpen && (
              <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5 border-b border-slate-100">
                  Regional Service Areas
                </div>
                <div className="py-1">
                  {headerLocations.map((loc) => (
                    <Link
                      key={loc.to}
                      to={loc.to}
                      onClick={() => setLocationsOpen(false)}
                      className="flex flex-col px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      <span className="text-xs font-bold text-slate-800 group-hover:text-primary transition-colors flex items-center justify-between">
                        {loc.label}
                        <Icon name="chevron_right" className="text-[14px] text-slate-400 group-hover:text-primary transition-colors" />
                      </span>
                      <span className="text-[10px] text-slate-500 line-clamp-1">{loc.desc}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-primary text-white font-bold text-xs shadow-sm hover:bg-secondary transition-all whitespace-nowrap"
            href={waLink('', settings.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="chat" className="text-[16px] text-emerald-300" />
            <span>WhatsApp Desk</span>
          </a>
          <Link
            to="/#booking-card"
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-secondary text-on-secondary font-bold text-xs shadow-md hover:bg-secondary-fixed hover:text-on-secondary-fixed hover:shadow-lg transition-all whitespace-nowrap"
            aria-label="Book a cab"
          >
            <Icon name="directions_car" className="text-[16px]" />
            <span className="hidden sm:inline">Book Cab</span>
          </Link>
          <button
            type="button"
            className="xl:hidden shrink-0 w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-surface-container-high transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <Icon name={menuOpen ? 'close' : 'menu'} className="text-[20px]" />
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav id="mobile-navigation" className="xl:hidden bg-surface-container-lowest border-t border-surface-container px-gutter-mobile py-space-md flex flex-col gap-space-sm shadow-xl max-h-[80vh] overflow-y-auto">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `font-title-md text-title-md py-2 px-2 rounded-lg transition-colors ${
                  isActive ? 'bg-surface-container text-secondary font-bold' : 'text-on-surface-variant'
                }`
              }
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}

          {/* Mobile Taxi Hubs Section */}
          <div className="pt-2 border-t border-surface-container">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
              Taxi Hubs &amp; Stations
            </div>
            <div className="grid grid-cols-1 gap-1 pt-1">
              {headerLocations.map((loc) => (
                <Link
                  key={loc.to}
                  to={loc.to}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-surface-container hover:text-primary transition-colors"
                >
                  <span>{loc.label}</span>
                  <Icon name="chevron_right" className="text-[14px] text-slate-400" />
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-surface-container mt-1">
            <Link
              to="/admin/login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-surface-container text-primary font-title-md text-title-md hover:bg-secondary hover:text-on-secondary transition-colors"
            >
              <Icon name="admin_panel_settings" className="text-[20px] text-secondary" />
              <span>Admin Portal Login</span>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
