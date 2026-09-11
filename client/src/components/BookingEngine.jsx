import React, { useState } from 'react';
import Icon from './Icon';
import { waLink } from '../data/siteConfig';
import { useSettings } from '../hooks';
import { bookingApi } from '../api';

const tripTypes = ['One Way', 'Round Trip', 'Local / Hourly', 'Tour Package'];
const vehicleOptions = [
  'Sedan (Dzire / Etios) - 4+1 Seater',
  'SUV (Ertiga Smart Hybrid) - 6+1 Seater',
  'Innova Crysta Luxury - Captain Seats',
  'Tempo Traveller (12 / 17 Seater)',
];

const BookingEngine = () => {
  const { data: settings } = useSettings();
  const [tripType, setTripType] = useState('One Way');
  const [form, setForm] = useState({
    pickup: 'Una / ISBT Una, HP',
    destination: '',
    date: '',
    vehicle: vehicleOptions[2],
    name: '',
    phone: '',
  });
  const [status, setStatus] = useState({ loading: false, error: '', success: false });

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const previewText = `Hello Vinod Travels, I need a quote for ${tripType} cab from ${form.pickup || 'Una'} to ${
    form.destination || '[destination]'
  } on ${form.date || 'today'}. Vehicle: ${form.vehicle}.`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.destination || !form.date) return;

    setStatus({ loading: true, error: '', success: false });
    try {
      await bookingApi.create({
        name: form.name || 'Website Guest',
        phone: form.phone || 'Not provided',
        tripType,
        pickup: form.pickup,
        destination: form.destination,
        date: form.date,
        vehicle: form.vehicle,
      });
      setStatus({ loading: false, error: '', success: true });
    } catch (err) {
      setStatus({ loading: false, error: 'Could not save booking, but you can still WhatsApp us.', success: false });
    }
    window.open(waLink(previewText, settings.whatsapp), '_blank', 'noopener,noreferrer');
  };

  const quickPickups = ['Una Railway Station', 'Mehatpur', 'Tahliwal', 'Amb Andaura'];
  const quickDrops = ['Chandigarh Airport (IXC)', 'Delhi Airport (IGI)', 'Shimla Mall Road', 'Manali'];

  return (
    <section
      id="booking-card"
      className="relative z-20 max-w-max-width-content mx-auto px-gutter-mobile lg:px-gutter-desktop -mt-10 lg:-mt-16 w-full"
    >
      <div className="rounded-3xl bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-slate-100 p-6 lg:p-8 text-on-surface">
        {/* Top bar with Trip Type Selector and Trust Badges */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 gap-1.5 flex-wrap">
            {tripTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setTripType(type)}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                  tripType === type
                    ? 'bg-primary text-white shadow-md font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
            <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              <Icon name="verified_user" className="text-[16px] text-emerald-600" />
              <span>Instant WhatsApp Confirmation</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-amber-800 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
              <Icon name="shield" className="text-[16px] text-amber-600" />
              <span>Zero Surge Pricing</span>
            </span>
          </div>
        </div>

        {/* Form Inputs Grid */}
        <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 items-end pt-6" onSubmit={handleSubmit}>
          {/* Pickup */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
              <Icon name="trip_origin" className="text-[16px] text-secondary" /> Pickup Location
            </label>
            <div className="relative">
              <input
                className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all font-medium"
                type="text"
                value={form.pickup}
                onChange={update('pickup')}
                placeholder="e.g. ISBT Una Counter"
                required
              />
              <Icon name="location_on" className="absolute right-3 top-3.5 text-[18px] text-slate-400 pointer-events-none" />
            </div>
            <div className="flex flex-wrap gap-1 pt-1">
              {quickPickups.map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setForm((f) => ({ ...f, pickup: p }))}
                  className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Destination */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
              <Icon name="location_on" className="text-[16px] text-secondary" /> Drop Destination
            </label>
            <div className="relative">
              <input
                className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all font-medium"
                type="text"
                placeholder="e.g. Chandigarh, Shimla, Manali"
                value={form.destination}
                onChange={update('destination')}
                required
              />
              <Icon name="pin_drop" className="absolute right-3 top-3.5 text-[18px] text-slate-400 pointer-events-none" />
            </div>
            <div className="flex flex-wrap gap-1 pt-1">
              {quickDrops.map((d) => (
                <button
                  type="button"
                  key={d}
                  onClick={() => setForm((f) => ({ ...f, destination: d }))}
                  className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                >
                  {d.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Journey Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
              <Icon name="calendar_today" className="text-[16px] text-secondary" /> Journey Date
            </label>
            <input
              className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all font-medium"
              type="date"
              value={form.date}
              onChange={update('date')}
              required
            />
            <div className="text-[11px] text-slate-500 font-medium pt-1">Advance &amp; Same-day Instant Cab</div>
          </div>

          {/* Vehicle Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
              <Icon name="directions_car" className="text-[16px] text-secondary" /> Select Vehicle
            </label>
            <select
              className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white rounded-xl px-3 py-3 text-sm text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all font-medium"
              value={form.vehicle}
              onChange={update('vehicle')}
            >
              {vehicleOptions.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
            <div className="text-[11px] text-slate-500 font-medium pt-1">Verified HP Commercial Permits</div>
          </div>

          {/* Submit Button */}
          <div className="space-y-1.5">
            <button
              type="submit"
              disabled={status.loading}
              className="w-full h-[48px] rounded-xl bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all disabled:opacity-60"
            >
              <Icon name="chat" className="text-white text-[20px]" />
              <span>{status.loading ? 'Sending...' : 'Get WhatsApp Quote'}</span>
            </button>
            <div className="text-[11px] text-center text-slate-500 font-medium pt-1">Direct ISBT Una Desk Response</div>
          </div>
        </form>

        {/* Pre-filled Message Preview */}
        <div className="mt-5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <Icon name="info" className="text-secondary text-[18px] shrink-0" />
            <span>
              <strong className="font-semibold text-slate-900">Pre-filled WhatsApp Request:</strong>{' '}
              <span className="italic text-slate-600">"{previewText}"</span>
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 font-bold text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Dispatch Desk Live (24x7)
            </span>
          </div>
        </div>

        {status.success && (
          <p className="text-sm text-emerald-600 font-medium pt-3 text-center">
            Booking request saved! WhatsApp has opened to confirm your ride directly.
          </p>
        )}
        {status.error && <p className="text-sm text-red-600 font-medium pt-3 text-center">{status.error}</p>}
      </div>
    </section>
  );
};

export default BookingEngine;
