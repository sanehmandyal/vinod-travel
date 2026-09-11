import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import Icon from '../../components/Icon';
import { contactApi } from '../../api';

const statusOptions = ['New', 'Contacted', 'Resolved'];
const statusColor = {
  New: 'bg-secondary-container text-on-secondary-container',
  Contacted: 'bg-tertiary-fixed text-on-tertiary-fixed',
  Resolved: 'bg-primary-fixed text-on-primary-fixed',
};

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    contactApi
      .list()
      .then(setEnquiries)
      .catch(() => setError('Could not load enquiries.'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const updateStatus = async (id, status) => {
    await contactApi.update(id, { status });
    load();
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this enquiry permanently?')) return;
    await contactApi.remove(id);
    load();
  };

  return (
    <AdminLayout title="Contact Enquiries">
      {error && <p className="text-error font-body-sm mb-space-md">{error}</p>}
      <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-left text-body-sm font-body-sm min-w-[700px]">
          <thead>
            <tr className="text-on-surface-variant border-b border-surface-container">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Message</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && enquiries.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-on-surface-variant">
                  No enquiries yet.
                </td>
              </tr>
            )}
            {enquiries.map((e) => (
              <tr key={e._id} className="border-b border-surface-container/60 align-top">
                <td className="py-3 px-4 font-semibold text-on-surface">{e.name}</td>
                <td className="py-3 px-4">{e.phone}</td>
                <td className="py-3 px-4 max-w-sm">{e.message}</td>
                <td className="py-3 px-4">
                  <select
                    value={e.status}
                    onChange={(ev) => updateStatus(e._id, ev.target.value)}
                    className={`px-2 py-1 rounded-full font-label-sm text-label-sm border-none focus:outline-none focus:ring-2 focus:ring-secondary/50 ${statusColor[e.status]}`}
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
                    onClick={() => remove(e._id)}
                    className="w-8 h-8 rounded-lg bg-error-container text-on-error-container flex items-center justify-center hover:opacity-80"
                    aria-label="Delete enquiry"
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

export default Enquiries;
