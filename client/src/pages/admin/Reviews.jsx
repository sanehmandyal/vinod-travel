import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import Icon from '../../components/Icon';
import { reviewApi } from '../../api';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    reviewApi
      .listAdmin()
      .then(setReviews)
      .catch(() => setError('Could not load reviews.'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const toggleApprove = async (r) => {
    await reviewApi.update(r._id, { approved: !r.approved });
    load();
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this review permanently?')) return;
    await reviewApi.remove(id);
    load();
  };

  return (
    <AdminLayout title="Reviews">
      {error && <p className="text-error font-body-sm mb-space-md">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
        {!loading && reviews.length === 0 && (
          <p className="text-on-surface-variant font-body-sm">No reviews submitted yet.</p>
        )}
        {reviews.map((r) => (
          <div key={r._id} className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-lg space-y-space-sm">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-title-md text-title-md text-primary font-bold">{r.name}</h4>
                <span className="font-body-sm text-body-sm text-on-surface-variant">{r.tag}</span>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm ${
                  r.approved ? 'bg-tertiary-fixed text-on-tertiary-fixed' : 'bg-secondary-container text-on-secondary-container'
                }`}
              >
                {r.approved ? 'Approved' : 'Pending'}
              </span>
            </div>
            <div className="flex items-center text-secondary">
              {Array.from({ length: r.rating }).map((_, i) => (
                <Icon key={i} name="star" className="text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }} />
              ))}
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant italic">"{r.comment}"</p>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => toggleApprove(r)}
                className={`flex-1 py-2 rounded-xl font-label-sm text-label-sm ${
                  r.approved ? 'bg-surface-container text-on-surface-variant' : 'bg-primary text-on-primary hover:bg-secondary'
                }`}
              >
                {r.approved ? 'Unpublish' : 'Approve & Publish'}
              </button>
              <button
                onClick={() => remove(r._id)}
                className="w-9 h-9 rounded-xl bg-error-container text-on-error-container flex items-center justify-center hover:opacity-80"
                aria-label="Delete review"
              >
                <Icon name="delete" className="text-[16px]" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default Reviews;
