import React, { useState } from 'react';
import Icon from './Icon';
import SectionHeading from './SectionHeading';
import { waLink } from '../data/siteConfig';
import { useSettings } from '../hooks';
import { bookingApi } from '../api';

const vehicleOptions = ['Dzire / Etios (Sedan)', 'Ertiga (6+1 SUV)', 'Innova Crysta (Luxury)', 'Tempo Traveller (Group)'];
const tripStructures = ['One Way', 'Round Trip', 'Tour Package'];

const initialForm = {
  name: '',
  phone: '',
  pickup: 'ISBT Una Counter',
  destination: '',
  date: '',
  vehicle: vehicleOptions[2],
  tripType: tripStructures[0],
  notes: '',
};

const ContactSection = ({ showHeading = true }) => {
  const { data: settings } = useSettings();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ loading: false, error: '', success: false });

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: false });
    try {
      await bookingApi.create({
        name: form.name,
        phone: form.phone,
        pickup: form.pickup,
        destination: form.destination,
        date: form.date,
        vehicle: form.vehicle,
        tripType: form.tripType,
        passengers: 1,
        notes: form.notes,
      });
      setStatus({ loading: false, error: '', success: true });
      const text = `Hello Vinod Travels, I am ${form.name}. Pickup: ${form.pickup}, Destination: ${form.destination}, Date: ${form.date}, Vehicle: ${form.vehicle}, Trip: ${form.tripType}. ${form.notes || ''}`;
      window.open(waLink(text, settings.whatsapp), '_blank', 'noopener,noreferrer');
      setForm(initialForm);
    } catch (err) {
      setStatus({ loading: false, error: 'Something went wrong. Please try WhatsApp or call directly.', success: false });
    }
  };

  return (
    <section className="w-full py-20 lg:py-28 bg-white text-on-surface" id="contact">
      <div className="max-w-max-width-content mx-auto px-gutter-mobile lg:px-gutter-desktop space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            {showHeading && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                  Physical Counter &amp; Booking Desk
                </span>
                <h2 className="font-headline-lg text-2xl lg:text-3xl text-slate-900 tracking-tight font-bold">
                  Visit Us Directly at ISBT Una Counter
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Arriving at Una by interstate bus or train? Come straight to our counter inside the
                  ISBT terminal for authorized dispatch or immediate booking.
                </p>
              </div>
            )}

            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-sm space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-secondary shrink-0">
                  <Icon name="location_city" className="text-[26px]" />
                </div>
                <div>
                  <h4 className="font-title-lg text-lg text-slate-900 font-bold">{settings.businessName || settings.name}</h4>
                  <p className="text-xs text-slate-600 pt-0.5">{settings.fullAddress}</p>
                </div>
              </div>
              <div className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-200">
                <div className="flex items-center gap-2.5">
                  <Icon name="schedule" className="text-[18px] text-secondary" />
                  <span>
                    <strong>Operating Hours:</strong> {settings.hours}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Icon name="call" className="text-[18px] text-secondary" />
                  <span>
                    <strong>Desk Hotline:</strong> {settings.phonePrimary}
                    {settings.phoneSecondary ? ` / ${settings.phoneSecondary}` : ''}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Icon name="chat" className="text-[18px] text-emerald-600" />
                  <span>
                    <strong>WhatsApp Helpdesk:</strong> {settings.phonePrimary} (Instant reply)
                  </span>
                </div>
              </div>
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={`tel:${settings.phonePrimary.replace(/\s/g, '')}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-white font-semibold text-xs hover:bg-secondary transition-colors shadow-sm"
                >
                  <Icon name="call" className="text-[18px]" />
                  <span>Call Dispatcher</span>
                </a>
                <a
                  href={waLink('Hello Vinod Travels, I am at ISBT Una counter.', settings.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  <Icon name="chat" className="text-[18px]" />
                  <span>WhatsApp Desk</span>
                </a>
              </div>
            </div>

            <div className="w-full h-60 rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative">
              <iframe
                title="Business Location Map"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  settings.mapEmbedQuery || settings.fullAddress || settings.location
                )}&output=embed`}
              />
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  settings.mapEmbedQuery || settings.fullAddress || settings.location
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-md text-slate-800 font-bold text-xs hover:text-secondary border border-slate-200"
              >
                <Icon name="directions" className="text-[16px] text-secondary" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-50 border border-slate-200/80 rounded-3xl p-7 lg:p-9 shadow-lg space-y-5">
            <div className="space-y-1.5 border-b border-slate-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">Quick Inquiries</span>
              <h3 className="font-headline-md text-xl lg:text-2xl text-slate-900 font-bold">Send Direct Booking Request</h3>
              <p className="text-xs text-slate-600">
                Fill in your journey requirements and receive an all-inclusive fixed quote on WhatsApp within
                5 minutes.
              </p>
            </div>
            <form className="space-y-4 pt-1" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Your Full Name</label>
                  <input
                    className="w-full bg-white rounded-xl px-4 py-3 text-sm text-slate-900 border border-slate-200 focus:ring-2 focus:ring-secondary/40 focus:outline-none"
                    placeholder="e.g. Ramesh Verma"
                    value={form.name}
                    onChange={update('name')}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">WhatsApp / Mobile Number</label>
                  <input
                    className="w-full bg-white rounded-xl px-4 py-3 text-sm text-slate-900 border border-slate-200 focus:ring-2 focus:ring-secondary/40 focus:outline-none"
                    placeholder="e.g. +91 98160 12345"
                    value={form.phone}
                    onChange={update('phone')}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Pickup Location in / around Una</label>
                  <input
                    className="w-full bg-white rounded-xl px-4 py-3 text-sm text-slate-900 border border-slate-200 focus:ring-2 focus:ring-secondary/40 focus:outline-none"
                    value={form.pickup}
                    onChange={update('pickup')}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Drop Destination</label>
                  <input
                    className="w-full bg-white rounded-xl px-4 py-3 text-sm text-slate-900 border border-slate-200 focus:ring-2 focus:ring-secondary/40 focus:outline-none"
                    placeholder="e.g. Chandigarh, Shimla, Manali"
                    value={form.destination}
                    onChange={update('destination')}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Departure Date</label>
                  <input
                    type="date"
                    className="w-full bg-white rounded-xl px-3 py-3 text-sm text-slate-900 border border-slate-200 focus:ring-2 focus:ring-secondary/40 focus:outline-none"
                    value={form.date}
                    onChange={update('date')}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Vehicle Preference</label>
                  <select
                    className="w-full bg-white rounded-xl px-3 py-3 text-sm text-slate-900 border border-slate-200 focus:ring-2 focus:ring-secondary/40 focus:outline-none"
                    value={form.vehicle}
                    onChange={update('vehicle')}
                  >
                    {vehicleOptions.map((v) => (
                      <option key={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Trip Structure</label>
                  <select
                    className="w-full bg-white rounded-xl px-3 py-3 text-sm text-slate-900 border border-slate-200 focus:ring-2 focus:ring-secondary/40 focus:outline-none"
                    value={form.tripType}
                    onChange={update('tripType')}
                  >
                    {tripStructures.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Special Requests / Luggage Count (Optional)
                </label>
                <textarea
                  className="w-full bg-white rounded-xl px-4 py-2.5 text-sm text-slate-900 border border-slate-200 focus:ring-2 focus:ring-secondary/40 focus:outline-none"
                  rows={2}
                  placeholder="e.g. Extra luggage carrier, child seat, flight departure timing..."
                  value={form.notes}
                  onChange={update('notes')}
                />
              </div>
              <button
                type="submit"
                disabled={status.loading}
                className="w-full py-4 rounded-xl bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-md hover:shadow-xl disabled:opacity-60"
              >
                <Icon name="chat" className="text-white text-[20px]" />
                <span>{status.loading ? 'Submitting...' : 'Submit Inquiry via WhatsApp Desk'}</span>
              </button>
              <div className="flex items-center justify-center gap-2 text-center text-xs text-slate-500 pt-1">
                <Icon name="lock" className="text-[14px] text-emerald-600" />
                <span>Zero spam guaranteed. Your phone number is only used to share the fare quote.</span>
              </div>
              {status.success && (
                <p className="text-sm text-emerald-600 font-medium text-center pt-1">
                  Thanks! Your request has been saved and WhatsApp has opened to confirm instantly.
                </p>
              )}
              {status.error && <p className="text-sm text-red-600 font-medium text-center pt-1">{status.error}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
