import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import ReviewsSection from '../components/ReviewsSection';
import Icon from '../components/Icon';
import { reviewApi } from '../api';

const initialForm = { name: '', tag: '', rating: 5, comment: '' };

const Reviews = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });
    try {
      await reviewApi.submit(form);
      setStatus({ loading: false, success: true, error: '' });
      setForm(initialForm);
    } catch (err) {
      setStatus({ loading: false, success: false, error: 'Could not submit review. Please try again later.' });
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Real Passenger Feedback"
        title="Passenger Reviews"
        description="Honest feedback from travelers who booked local rides, outstation trips and Himachal tours with us."
      />
      <ReviewsSection showHeading={false} />
      <section className="w-full py-space-3xl bg-surface">
        <div className="max-w-2xl mx-auto px-gutter-mobile lg:px-gutter-desktop bg-surface-container-lowest rounded-3xl shadow-xl p-space-lg space-y-space-md">
          <h3 className="font-headline-md text-headline-md text-primary font-bold">Share Your Experience</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Reviews are checked by our team before appearing publicly on the website.
          </p>
          <form className="space-y-space-sm" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
              <input
                className="w-full bg-surface-container-low rounded-xl px-space-md py-2.5 font-body-md text-body-md focus:ring-2 focus:ring-secondary/50 focus:outline-none"
                placeholder="Your Name"
                value={form.name}
                onChange={update('name')}
                required
              />
              <input
                className="w-full bg-surface-container-low rounded-xl px-space-md py-2.5 font-body-md text-body-md focus:ring-2 focus:ring-secondary/50 focus:outline-none"
                placeholder="Trip (e.g. Una to Manali)"
                value={form.tag}
                onChange={update('tag')}
              />
            </div>
            <div className="space-y-1">
              <label className="font-label-sm text-label-sm text-on-surface-variant">Rating</label>
              <select
                className="w-full bg-surface-container-low rounded-xl px-space-md py-2.5 font-body-md text-body-md focus:ring-2 focus:ring-secondary/50 focus:outline-none"
                value={form.rating}
                onChange={update('rating')}
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} Star{n > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              className="w-full bg-surface-container-low rounded-xl px-space-md py-2.5 font-body-md text-body-md focus:ring-2 focus:ring-secondary/50 focus:outline-none"
              rows={3}
              placeholder="Tell us about your journey..."
              value={form.comment}
              onChange={update('comment')}
              required
            />
            <button
              type="submit"
              disabled={status.loading}
              className="w-full py-3 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-2 hover:bg-secondary transition-all disabled:opacity-60"
            >
              <Icon name="rate_review" className="text-[20px]" />
              {status.loading ? 'Submitting...' : 'Submit Review'}
            </button>
            {status.success && (
              <p className="text-body-sm text-tertiary text-center">Thank you! Your review is pending approval.</p>
            )}
            {status.error && <p className="text-body-sm text-error text-center">{status.error}</p>}
          </form>
        </div>
      </section>
    </>
  );
};

export default Reviews;
