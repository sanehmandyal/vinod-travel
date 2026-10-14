import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Icon from '../components/Icon';
import SEO from '../components/SEO';
import BookingEngine from '../components/BookingEngine';
import { locations, getLocationBySlug } from '../data/locationData';
import { waLink, business, fallbackVehicles } from '../data/siteConfig';
import { useSettings } from '../hooks';

const LocationPage = ({ locationSlug }) => {
  const params = useParams();
  const slug = locationSlug || params.slug;
  const location = getLocationBySlug(slug) || locations[0];
  const { data: settings } = useSettings();
  const [openFaq, setOpenFaq] = useState(0);

  const baseUrl =
    typeof window !== 'undefined' && window.location.origin && !window.location.origin.includes('localhost')
      ? window.location.origin
      : 'https://www.unatourtravels.co.in';

  // Generate Google Schema.org JSON-LD structured data
  const taxiSchema = {
    '@context': 'https://schema.org',
    '@type': ['TaxiService', 'TravelAgency'],
    '@id': `${baseUrl}/${location.slug}#service`,
    name: `${location.shortName} Taxi Service - Vinod Tour & Travels`,
    url: `${baseUrl}/${location.slug}`,
    telephone: settings.phonePrimary || '+916230521544',
    priceRange: '₹₹',
    image: `${baseUrl}${location.heroImage}`,
    description: location.metaDescription,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address,
      addressLocality: location.shortName,
      addressRegion: 'Himachal Pradesh',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: location.name,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${baseUrl}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Service Areas',
        item: `${baseUrl}/services`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: location.title,
        item: `${baseUrl}/${location.slug}`,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: location.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  const otherLocations = locations.filter((l) => l.id !== location.id);

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      <SEO
        title={location.title}
        description={location.metaDescription}
        keywords={location.keywords}
        canonical={`/${location.slug}`}
        ogImage={location.heroImage}
        schema={[taxiSchema, breadcrumbSchema, faqSchema]}
      />

      {/* Hero Banner */}
      <section className="relative w-full bg-gradient-to-br from-primary via-emerald-950 to-slate-900 text-white pt-16 pb-24 lg:pt-24 lg:pb-36 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative max-w-max-width-content mx-auto px-gutter-mobile lg:px-gutter-desktop space-y-6">
          {/* Breadcrumb navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-emerald-200/80 font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-white transition-colors">Locations</Link>
            <span>/</span>
            <span className="text-white font-semibold">{location.shortName}</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary text-on-secondary font-label-sm text-xs font-bold tracking-wide shadow-sm">
              <Icon name="verified" className="text-[16px]" />
              <span>{location.badge}</span>
            </div>

            <h1 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              {location.headline}
            </h1>

            <p className="font-body-lg text-base sm:text-lg text-slate-200 leading-relaxed">
              {location.subheadline}
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href={`tel:${(settings.phonePrimary || '+916230521544').replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-secondary hover:bg-secondary-fixed text-on-secondary font-label-lg font-bold shadow-lg hover:shadow-xl transition-all"
              >
                <Icon name="call" className="text-[20px]" />
                <span>Call Dispatch: {settings.phonePrimary || '+91 62305 21544'}</span>
              </a>

              <a
                href={waLink(
                  `Hello Vinod Travels, I need a taxi quote for pickup from ${location.shortName}.`,
                  settings.whatsapp
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-label-lg font-bold shadow-lg hover:shadow-xl transition-all"
              >
                <Icon name="chat" className="text-[20px]" />
                <span>WhatsApp Booking</span>
              </a>
            </div>

            {/* Micro badges */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-4 text-xs font-semibold text-emerald-200/90 border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <Icon name="alarm_on" className="text-secondary-fixed text-[16px]" />
                24/7 Punctual Reporting
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="shield" className="text-secondary-fixed text-[16px]" />
                Verified Hill Drivers
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="receipt" className="text-secondary-fixed text-[16px]" />
                Zero Hidden Charges
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="ac_unit" className="text-secondary-fixed text-[16px]" />
                All Chilled AC Cars
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Booking Engine with Pre-Selected Hub Pickup */}
      <div className="relative z-30 max-w-max-width-content mx-auto px-gutter-mobile lg:px-gutter-desktop -mt-12 lg:-mt-20">
        <BookingEngine
          initialPickup={location.hubs[0]?.name || `${location.shortName}, HP`}
          className="w-full"
        />
      </div>

      {/* Key Local Hubs & Station Pickups */}
      <section className="py-16 lg:py-24 max-w-max-width-content mx-auto px-gutter-mobile lg:px-gutter-desktop">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary font-label-sm">
            Prime Pickup Zones in {location.shortName}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary font-headline-md tracking-tight">
            Key Stations, Stands &amp; Transit Hubs
          </h2>
          <p className="text-sm text-slate-600 font-body-sm">
            Our drivers are stationed across all major arrival terminals and passenger checkpoints with dedicated parking and rapid reporting.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {location.hubs.map((hub, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Icon name={hub.icon || 'location_on'} className="text-[24px]" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">{hub.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{hub.desc}</p>
              </div>
              <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-semibold text-primary">
                <span>Immediate Dispatch</span>
                <Icon name="arrow_forward" className="text-[14px]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Route & Travel Directory */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-max-width-content mx-auto px-gutter-mobile lg:px-gutter-desktop space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-secondary font-label-sm">
                Direct Connectivity
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary font-headline-md tracking-tight">
                Popular Travel Routes from {location.shortName}
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Direct outstation cabs, railway connections, airport transfers, and pilgrimage circuits with licensed hill drivers.
              </p>
            </div>
            <a
              href={`tel:${(settings.phonePrimary || '+916230521544').replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-xs shadow-sm hover:bg-secondary transition-all whitespace-nowrap self-start md:self-auto"
            >
              <Icon name="call" className="text-[16px]" />
              <span>Get Immediate Cab Quote</span>
            </a>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200 text-xs uppercase tracking-wider">
                  <th className="py-3.5 px-4">Destination &amp; Route</th>
                  <th className="py-3.5 px-4">Distance</th>
                  <th className="py-3.5 px-4">Travel Time</th>
                  <th className="py-3.5 px-4">Vehicle Options</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {location.routes.map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <div>{r.destination}</div>
                      <div className="text-[11px] font-normal text-slate-500 mt-0.5">{r.routeInfo}</div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap font-semibold text-slate-800">
                      {r.distance}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-600 font-medium">
                      {r.duration}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-xs text-slate-600">
                      <span className="bg-slate-100 px-2.5 py-1 rounded-md text-slate-700 font-medium">
                        {r.cabOptions || 'Sedan / SUV / Innova'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full text-xs">
                        <Icon name="check_circle" className="text-[14px]" /> 24/7 Available
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <a
                        href={waLink(
                          `Hello Vinod Travels, I need a quote for a cab from ${location.shortName} to ${r.destination}.`,
                          settings.whatsapp
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
                      >
                        <Icon name="chat" className="text-[14px]" />
                        <span>Get Quote</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Fleet Showcase */}
      <section className="py-16 lg:py-24 max-w-max-width-content mx-auto px-gutter-mobile lg:px-gutter-desktop space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary font-label-sm">
            Our Vehicle Fleet
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary font-headline-md tracking-tight">
            Clean, AC Vehicles for Every Traveling Need
          </h2>
          <p className="text-sm text-slate-600 font-body-sm">
            Maintained to pristine commercial hill standards with licensed, background-checked mountain chauffeurs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {fallbackVehicles.map((v) => (
            <div
              key={v._id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-44 w-full bg-slate-100 overflow-hidden relative">
                  <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-black/70 text-white text-[11px] font-bold">
                    {v.category}
                  </span>
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-slate-900 text-base">{v.name}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {v.features.map((f, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                        {f}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{v.description}</p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <a
                  href={waLink(
                    `Hello Vinod Travels, I need ${v.name} cab for pickup from ${location.shortName}.`,
                    settings.whatsapp
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-primary text-white font-bold text-xs hover:bg-secondary transition-all"
                >
                  <Icon name="check_circle" className="text-[15px]" />
                  <span>Reserve {v.category}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us & Local Travel Guide */}
      <section className="py-16 bg-slate-100 border-t border-slate-200">
        <div className="max-w-max-width-content mx-auto px-gutter-mobile lg:px-gutter-desktop grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary font-label-sm">
              Local Excellence &amp; Accountability
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary font-headline-md tracking-tight">
              Why Travelers Prefer Vinod Tour &amp; Travels in {location.shortName}
            </h2>

            <div className="space-y-4">
              {location.whyChoose.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="check" className="text-[18px]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
              <Icon name="explore" className="text-[16px]" />
              <span>Local Transit &amp; Pilgrimage Guide</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Navigating {location.shortName} &amp; Surrounding Himachal
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {location.localGuide}
            </p>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-500 font-medium">Direct Inquiries Desk</div>
                <div className="text-base font-bold text-primary">{settings.phonePrimary || '+91 62305 21544'}</div>
              </div>
              <a
                href={`tel:${(settings.phonePrimary || '+916230521544').replace(/\s/g, '')}`}
                className="px-4 py-2 rounded-xl bg-primary text-white font-bold text-xs hover:bg-secondary transition-all"
              >
                Call Operator
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ Section with Rich Snippet Accordion) */}
      <section className="py-16 lg:py-24 max-w-max-width-content mx-auto px-gutter-mobile lg:px-gutter-desktop">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary font-label-sm">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary font-headline-md tracking-tight">
            Frequently Asked Questions for {location.shortName} Cabs
          </h2>
          <p className="text-sm text-slate-600 font-body-sm">
            Everything you need to know about station pickups, vehicle choices, permits, and booking.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {location.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm hover:text-primary transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Icon name="help_outline" className="text-secondary text-[18px] shrink-0" />
                    {faq.q}
                  </span>
                  <Icon
                    name={isOpen ? 'expand_less' : 'expand_more'}
                    className="text-slate-400 text-[20px] shrink-0"
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-1">
                    <p className="pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Internal Linking: Explore Other Service Areas */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-max-width-content mx-auto px-gutter-mobile lg:px-gutter-desktop space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary">
              Regional Coverage
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-primary">
              Other Major Taxi Hubs We Serve
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {otherLocations.map((other) => (
              <Link
                key={other.id}
                to={`/${other.slug}`}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-primary hover:text-white hover:border-primary transition-all text-center group flex flex-col items-center justify-center gap-2"
              >
                <div className="w-10 h-10 rounded-full bg-white text-primary group-hover:bg-white/20 group-hover:text-white flex items-center justify-center transition-colors">
                  <Icon name="local_taxi" className="text-[20px]" />
                </div>
                <span className="text-xs font-bold text-slate-900 group-hover:text-white transition-colors">
                  {other.shortName}
                </span>
                <span className="text-[10px] text-slate-500 group-hover:text-emerald-100 transition-colors">
                  View Routes &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocationPage;
