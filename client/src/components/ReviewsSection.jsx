import React from 'react';
import Icon from './Icon';
import SectionHeading from './SectionHeading';
import { useContent } from '../hooks';
import { reviewApi } from '../api';
import { fallbackReviews } from '../data/siteConfig';
import { useSettings } from '../hooks';

const initials = (name) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

const ReviewsSection = ({ limit, showHeading = true }) => {
  const { data: reviews } = useContent(reviewApi.list, fallbackReviews);
  const { data: settings } = useSettings();
  const list = limit ? reviews.slice(0, limit) : reviews;

  return (
    <section className="w-full py-20 lg:py-28 bg-slate-50/80" id="reviews">
      <div className="max-w-max-width-content mx-auto px-gutter-mobile lg:px-gutter-desktop space-y-12">
        {showHeading && (
          <div className="rounded-3xl bg-[#031c14] text-white p-8 md:p-10 shadow-xl border border-emerald-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs uppercase tracking-wider text-amber-300 font-bold">
                Real Passenger Feedback • Verified Hill Journeys
              </span>
              <h2 className="font-headline-md text-2xl md:text-3xl font-bold">
                {settings.rating} Out of 5.0 Star Rating
              </h2>
              <p className="text-xs text-emerald-100/80">
                Based on {settings.reviewCount} verified traveler reviews at the physical ISBT Una booking desk.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-amber-400 text-3xl">
              {[1, 2, 3, 4, 5].map((i) => (
                <Icon key={i} name="star" style={{ fontVariationSettings: "'FILL' 1" }} />
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {list.map((r) => (
            <div
              key={r._id}
              className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center text-amber-500 gap-0.5">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Icon key={i} name="star" className="text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }} />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic">"{r.comment}"</p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <div className="w-11 h-11 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center font-bold text-emerald-800 text-sm shrink-0">
                  {initials(r.name)}
                </div>
                <div>
                  <div className="font-title-md text-sm font-bold text-slate-900">{r.name}</div>
                  <div className="text-xs text-slate-500">{r.tag}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center pt-2">
          <p className="text-sm text-slate-600">
            Travelled with {settings.businessName || settings.name} recently?{' '}
            <a
              className="font-semibold text-secondary underline ml-1 hover:text-primary transition-colors"
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Share your experience on Google Reviews
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
