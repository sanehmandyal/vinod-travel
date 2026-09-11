import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import Icon from '../../components/Icon';
import { settingsApi } from '../../api';

const emptyForm = {
  businessName: '',
  tagline: '',
  location: '',
  fullAddress: '',
  mapEmbedQuery: '',
  phonePrimary: '',
  phoneSecondary: '',
  whatsappNumber: '',
  email: '',
  hours: '',
};

const fieldGroups = [
  {
    title: 'Business Identity',
    fields: [
      { key: 'businessName', label: 'Business Name' },
      { key: 'tagline', label: 'Tagline' },
    ],
  },
  {
    title: 'Location',
    fields: [
      { key: 'location', label: 'Short Location (shown in header/badges), e.g. "ISBT Una, Himachal Pradesh"' },
      { key: 'fullAddress', label: 'Full Address (shown on Contact page & footer)', textarea: true },
      {
        key: 'mapEmbedQuery',
        label: 'Map Search Text (used to show the map on the Contact page), e.g. "ISBT Una Himachal Pradesh"',
      },
    ],
  },
  {
    title: 'Contact & WhatsApp',
    fields: [
      { key: 'phonePrimary', label: 'Primary Phone (e.g. +91 62305 21544)' },
      { key: 'phoneSecondary', label: 'Secondary Phone (optional)' },
      {
        key: 'whatsappNumber',
        label: 'WhatsApp Number — digits only with country code (e.g. 916230521544)',
      },
      { key: 'email', label: 'Email' },
      { key: 'hours', label: 'Operating Hours' },
    ],
  },
];

const Settings = () => {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    settingsApi
      .get()
      .then((data) => setForm({ ...emptyForm, ...data }))
      .catch(() => setMessage({ type: 'error', text: 'Could not load settings. Is the API server running?' }))
      .finally(() => setLoading(false));
  }, []);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      const updated = await settingsApi.update(form);
      setForm({ ...emptyForm, ...updated });
      setMessage({ type: 'success', text: 'Saved! Changes are now live on the website.' });
    } catch (err) {
      setMessage({ type: 'error', text: err?.response?.data?.message || 'Save failed.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Business Settings">
      {loading ? (
        <p className="font-body-md text-body-md text-on-surface-variant">Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-2xl space-y-space-lg">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            These details power the header, footer, contact page and every "Book on WhatsApp" button
            across the live website. Update the WhatsApp number or location here — no code changes needed.
          </p>

          {fieldGroups.map((group) => (
            <div key={group.title} className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-lg space-y-space-sm">
              <h3 className="font-title-lg text-title-lg text-primary font-bold">{group.title}</h3>
              {group.fields.map((f) => (
                <div key={f.key} className="space-y-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant">{f.label}</label>
                  {f.textarea ? (
                    <textarea
                      className="w-full bg-surface-container-low rounded-xl px-space-md py-2 font-body-md text-body-md focus:ring-2 focus:ring-secondary/50 focus:outline-none"
                      rows={2}
                      value={form[f.key] || ''}
                      onChange={update(f.key)}
                    />
                  ) : (
                    <input
                      type="text"
                      className="w-full bg-surface-container-low rounded-xl px-space-md py-2.5 font-body-md text-body-md focus:ring-2 focus:ring-secondary/50 focus:outline-none"
                      value={form[f.key] || ''}
                      onChange={update(f.key)}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}

          {message.text && (
            <p className={`font-body-sm text-body-sm ${message.type === 'error' ? 'text-error' : 'text-tertiary'}`}>
              {message.text}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-space-lg py-3 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg hover:bg-secondary transition-all disabled:opacity-60"
          >
            <Icon name="save" className="text-[18px]" />
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </form>
      )}
    </AdminLayout>
  );
};

export default Settings;
