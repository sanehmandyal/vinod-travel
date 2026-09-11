import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import Icon from '../../components/Icon';
import { bookingApi } from '../../api';

const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-lg flex items-center gap-space-md">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
      <Icon name={icon} className="text-[24px]" />
    </div>
    <div>
      <div className="font-headline-sm text-headline-sm text-primary font-bold">{value}</div>
      <div className="font-body-sm text-body-sm text-on-surface-variant">{label}</div>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    bookingApi
      .stats()
      .then(setStats)
      .catch(() => setError('Could not load stats. Is the API server running?'));
  }, []);

  return (
    <AdminLayout title="Dashboard">
      {error && <p className="text-error font-body-sm mb-space-md">{error}</p>}
      {stats && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-space-md mb-space-xl">
            <StatCard icon="event_note" label="Total Bookings" value={stats.total} color="bg-surface-container-high text-primary" />
            <StatCard icon="hourglass_empty" label="Pending" value={stats.pending} color="bg-secondary-container text-on-secondary-container" />
            <StatCard icon="check_circle" label="Confirmed" value={stats.confirmed} color="bg-tertiary-fixed text-on-tertiary-fixed" />
            <StatCard icon="task_alt" label="Completed" value={stats.completed} color="bg-primary-fixed text-on-primary-fixed" />
            <StatCard icon="cancel" label="Cancelled" value={stats.cancelled} color="bg-error-container text-on-error-container" />
          </div>

          <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-lg">
            <h3 className="font-title-lg text-title-lg text-primary font-bold mb-space-md">Recent Bookings</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-body-sm font-body-sm">
                <thead>
                  <tr className="text-on-surface-variant border-b border-surface-container">
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Route</th>
                    <th className="py-2 pr-4">Date</th>
                    <th className="py-2 pr-4">Vehicle</th>
                    <th className="py-2 pr-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recent.map((b) => (
                    <tr key={b._id} className="border-b border-surface-container/60">
                      <td className="py-2 pr-4 font-semibold text-on-surface">{b.name}</td>
                      <td className="py-2 pr-4">
                        {b.pickup} → {b.destination}
                      </td>
                      <td className="py-2 pr-4">{new Date(b.date).toLocaleDateString()}</td>
                      <td className="py-2 pr-4">{b.vehicle}</td>
                      <td className="py-2 pr-4">
                        <span className="px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm">
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {stats.recent.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-4 text-center text-on-surface-variant">
                        No bookings yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default Dashboard;
