import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import Icon from '../../components/Icon';
import { bookingApi } from '../../api';

const statusOptions = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
const statusColor = {
  Pending: 'bg-secondary-container text-on-secondary-container',
  Confirmed: 'bg-tertiary-fixed text-on-tertiary-fixed',
  Completed: 'bg-primary-fixed text-on-primary-fixed',
  Cancelled: 'bg-error-container text-on-error-container',
};

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    bookingApi
      .list(filter ? { status: filter } : {})
      .then(setBookings)
      .catch(() => setError('Could not load bookings.'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [filter]);

  const updateStatus = async (id, status) => {
    await bookingApi.update(id, { status });
    load();
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this booking permanently?')) return;
    await bookingApi.remove(id);
    load();
  };

  return (
    <AdminLayout title="Bookings">
      <div className="flex items-center gap-space-sm mb-space-md flex-wrap">
        <button
          onClick={() => setFilter('')}
          className={`px-space-md py-1.5 rounded-full font-label-md text-label-md ${
            filter === '' ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'
          }`}
        >
          All
        </button>
        {statusOptions.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-space-md py-1.5 rounded-full font-label-md text-label-md ${
              filter === s ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {error && <p className="text-error font-body-sm mb-space-md">{error}</p>}

      <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-left text-body-sm font-body-sm min-w-[900px]">
          <thead>
            <tr className="text-on-surface-variant border-b border-surface-container">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Route</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Vehicle</th>
              <th className="py-3 px-4">Trip</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && bookings.length === 0 && (
              <tr>
                <td colSpan={8} className="py-6 text-center text-on-surface-variant">
                  No bookings found.
                </td>
              </tr>
            )}
            {bookings.map((b) => (
              <tr key={b._id} className="border-b border-surface-container/60 align-top">
                <td className="py-3 px-4 font-semibold text-on-surface">{b.name}</td>
                <td className="py-3 px-4">{b.phone}</td>
                <td className="py-3 px-4">
                  {b.pickup} → {b.destination}
                </td>
                <td className="py-3 px-4">{new Date(b.date).toLocaleDateString()}</td>
                <td className="py-3 px-4">{b.vehicle}</td>
                <td className="py-3 px-4">{b.tripType}</td>
                <td className="py-3 px-4">
                  <select
                    value={b.status}
                    onChange={(e) => updateStatus(b._id, e.target.value)}
                    className={`px-2 py-1 rounded-full font-label-sm text-label-sm border-none focus:outline-none focus:ring-2 focus:ring-secondary/50 ${statusColor[b.status]}`}
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => remove(b._id)}
                    className="w-8 h-8 rounded-lg bg-error-container text-on-error-container flex items-center justify-center hover:opacity-80"
                    aria-label="Delete booking"
                  >
                    <Icon name="delete" className="text-[18px]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Bookings;
