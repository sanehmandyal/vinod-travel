import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import Icon from '../../components/Icon';
import { bookingApi, settingsApi } from '../../api';

const StatCard = ({ icon, label, value, color, to }) => (
  <NavLink
    to={to}
    className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-lg flex items-center gap-space-md transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-secondary/50"
    aria-label={`Open ${label}`}
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
      <Icon name={icon} className="text-[24px]" />
    </div>
    <div>
      <div className="font-headline-sm text-headline-sm text-primary font-bold">{value}</div>
      <div className="font-body-sm text-body-sm text-on-surface-variant">{label}</div>
    </div>
  </NavLink>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    bookingApi
      .stats()
      .then(setStats)
      .catch(() => setError('Could not load stats. Is the API server running?'));
  }, []);

  const handleSyncContent = async () => {
    setSeeding(true);
    setError('');
    setSuccess('');
    try {
      const res = await settingsApi.seedDefault();
      setSuccess(res?.message || 'Default content successfully populated in database!');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to sync content to database.');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <AdminLayout title="Dashboard">
      {error && <p className="text-error font-body-sm mb-space-md bg-error-container/20 p-3 rounded-xl">{error}</p>}
      {success && <p className="text-emerald-700 font-body-sm mb-space-md bg-emerald-50 p-3 rounded-xl border border-emerald-200">{success}</p>}

      {stats && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-space-md mb-space-lg">
            <StatCard to="/admin/bookings" icon="event_note" label="Total Bookings" value={stats.total} color="bg-surface-container-high text-primary" />
            <StatCard to="/admin/bookings" icon="hourglass_empty" label="Pending" value={stats.pending} color="bg-secondary-container text-on-secondary-container" />
            <StatCard to="/admin/bookings" icon="check_circle" label="Confirmed" value={stats.confirmed} color="bg-tertiary-fixed text-on-tertiary-fixed" />
            <StatCard to="/admin/bookings" icon="task_alt" label="Completed" value={stats.completed} color="bg-primary-fixed text-on-primary-fixed" />
            <StatCard to="/admin/bookings" icon="cancel" label="Cancelled" value={stats.cancelled} color="bg-error-container text-on-error-container" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-space-md mb-space-lg">
            <StatCard to="/admin/vehicles" icon="directions_car" label="Fleet Vehicles" value={stats.content?.vehicles ?? 0} color="bg-primary-container text-on-primary" />
            <StatCard to="/admin/destinations" icon="route" label="Routes" value={stats.content?.destinations ?? 0} color="bg-secondary-container text-on-secondary-container" />
            <StatCard to="/admin/tour-packages" icon="landscape" label="Tour Packages" value={stats.content?.tourPackages ?? 0} color="bg-tertiary-fixed text-on-tertiary-fixed" />
            <StatCard to="/admin/gallery" icon="photo_library" label="Gallery Items" value={stats.content?.galleryItems ?? 0} color="bg-primary-fixed text-on-primary-fixed" />
            <StatCard to="/admin/reviews" icon="reviews" label="Reviews" value={stats.content?.reviews ?? 0} color="bg-surface-container-high text-primary" />
          </div>

          <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-lg mb-space-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-surface-container">
            <div>
              <h3 className="font-title-md text-title-md text-primary font-bold">Populate Website Data into Admin Panel</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xl">
                If your admin sections show 0 records, click here to sync the default website data (4 Vehicles, 7 Destinations, 4 Tour Packages, 8 Gallery Photos, 3 Reviews) into MongoDB.
              </p>
            </div>
            <button
              type="button"
              onClick={handleSyncContent}
              disabled={seeding}
              className="inline-flex items-center gap-2 px-space-md py-2.5 rounded-xl bg-primary text-on-primary font-label-md hover:bg-secondary transition-all disabled:opacity-60 whitespace-nowrap self-start md:self-auto shadow-sm"
            >
              <Icon name="sync" className={`text-[18px] ${seeding ? 'animate-spin' : ''}`} />
              <span>{seeding ? 'Syncing to DB...' : 'Sync Default Content to DB'}</span>
            </button>
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
