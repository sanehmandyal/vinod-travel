import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import Icon from './Icon';
import { uploadApi } from '../api';
import { resolveImageUrl } from '../utils/media';

// Generic admin CRUD screen driven by a field schema, used for the
// simple content models (Vehicles, Destinations, Tour Packages, Gallery).
// field: { key, label, type: 'text'|'textarea'|'number'|'checkbox'|'select'|'tags', options?, default }
const emptyFromSchema = (fields) =>
  fields.reduce((acc, f) => {
    acc[f.key] = f.type === 'checkbox' ? !!f.default : f.type === 'tags' ? [] : f.default ?? '';
    return acc;
  }, {});

const AdminContentManager = ({ title, api, fields, columns }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null); // null = closed, {} = new, {...item} = edit
  const [form, setForm] = useState({});
  const [uploading, setUploading] = useState('');

  const load = () => {
    setLoading(true);
    api
      .listAdmin()
      .then(setItems)
      .catch(() => setError('Could not load data. Is the API server running?'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openNew = () => {
    setForm(emptyFromSchema(fields));
    setEditing({});
  };

  const openEdit = (item) => {
    const next = { ...emptyFromSchema(fields) };
    fields.forEach((f) => {
      if (f.type === 'tags') next[f.key] = Array.isArray(item[f.key]) ? item[f.key].join(', ') : '';
      else next[f.key] = item[f.key] ?? next[f.key];
    });
    setForm(next);
    setEditing(item);
  };

  const closeModal = () => setEditing(null);

  const update = (key, type) => (e) => {
    const value = type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form };
    fields.forEach((f) => {
      if (f.type === 'tags') {
        payload[f.key] = form[f.key]
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
      }
      if (f.type === 'number') payload[f.key] = Number(form[f.key]) || 0;
    });

    try {
      if (editing && editing._id) {
        await api.update(editing._id, payload);
      } else {
        await api.create(payload);
      }
      closeModal();
      load();
    } catch (err) {
      setError(err?.response?.data?.message || 'Save failed.');
    }
  };

  const handleImageUpload = (key) => async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(key);
    setError('');
    try {
      const { url } = await uploadApi.image(file);
      setForm((f) => ({ ...f, [key]: url }));
    } catch (err) {
      setError(err?.response?.data?.message || 'Image upload failed. Try a smaller JPG/PNG file.');
    } finally {
      setUploading('');
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this item permanently?')) return;
    await api.remove(id);
    load();
  };

  return (
    <AdminLayout title={title}>
      <div className="flex items-center justify-between mb-space-md">
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          {items.length} item{items.length === 1 ? '' : 's'}
        </p>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 px-space-md py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-secondary transition-colors"
        >
          <Icon name="add" className="text-[18px]" />
          Add New
        </button>
      </div>

      {error && <p className="text-error font-body-sm mb-space-md">{error}</p>}

      <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-left text-body-sm font-body-sm min-w-[700px]">
          <thead>
            <tr className="text-on-surface-variant border-b border-surface-container">
              {columns.map((c) => (
                <th key={c.key} className="py-3 px-4">
                  {c.label}
                </th>
              ))}
              <th className="py-3 px-4">Active</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && items.length === 0 && (
              <tr>
                <td colSpan={columns.length + 2} className="py-6 text-center text-on-surface-variant">
                  No items yet. Click "Add New" to create one.
                </td>
              </tr>
            )}
            {items.map((item) => (
              <tr key={item._id} className="border-b border-surface-container/60">
                {columns.map((c) => (
                  <td key={c.key} className="py-3 px-4">
                    {c.render ? c.render(item) : item[c.key]}
                  </td>
                ))}
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm ${
                      item.active ? 'bg-tertiary-fixed text-on-tertiary-fixed' : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    {item.active ? 'Active' : 'Hidden'}
                  </span>
                </td>
                <td className="py-3 px-4 flex items-center gap-2">
                  <button
                    onClick={() => openEdit(item)}
                    className="w-8 h-8 rounded-lg bg-surface-container text-primary flex items-center justify-center hover:bg-secondary hover:text-on-secondary"
                    aria-label="Edit"
                  >
                    <Icon name="edit" className="text-[16px]" />
                  </button>
                  <button
                    onClick={() => remove(item._id)}
                    className="w-8 h-8 rounded-lg bg-error-container text-on-error-container flex items-center justify-center hover:opacity-80"
                    aria-label="Delete"
                  >
                    <Icon name="delete" className="text-[16px]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing !== null && (
        <div className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-sm flex items-center justify-center p-gutter-mobile">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-surface-container-lowest rounded-2xl shadow-2xl p-space-lg space-y-space-md">
            <div className="flex items-center justify-between">
              <h3 className="font-title-lg text-title-lg text-primary font-bold">
                {editing._id ? 'Edit Item' : 'Add New Item'}
              </h3>
              <button onClick={closeModal} className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center">
                <Icon name="close" className="text-[18px]" />
              </button>
            </div>
            <form className="space-y-space-sm" onSubmit={handleSubmit}>
              {fields.map((f) => (
                <div key={f.key} className="space-y-1">
                  {f.type !== 'checkbox' && (
                    <label className="font-label-sm text-label-sm text-on-surface-variant">{f.label}</label>
                  )}
                  {f.type === 'textarea' && (
                    <textarea
                      className="w-full bg-surface-container-low rounded-xl px-space-md py-2 font-body-md text-body-md focus:ring-2 focus:ring-secondary/50 focus:outline-none"
                      rows={3}
                      value={form[f.key] || ''}
                      onChange={update(f.key)}
                      required={f.required}
                    />
                  )}
                  {(f.type === 'text' || f.type === 'number' || f.type === 'tags') && (
                    <input
                      type={f.type === 'number' ? 'number' : 'text'}
                      className="w-full bg-surface-container-low rounded-xl px-space-md py-2.5 font-body-md text-body-md focus:ring-2 focus:ring-secondary/50 focus:outline-none"
                      value={form[f.key] ?? ''}
                      onChange={update(f.key)}
                      placeholder={f.placeholder}
                      required={f.required}
                    />
                  )}
                  {f.type === 'image' && (
                    <div className="space-y-2">
                      {resolveImageUrl(form[f.key]) ? (
                        <div className="relative w-full h-36 rounded-xl overflow-hidden bg-surface-container-low">
                          <img src={resolveImageUrl(form[f.key])} alt="Preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setForm((s) => ({ ...s, [f.key]: '' }))}
                            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-primary/80 text-on-primary flex items-center justify-center"
                            aria-label="Remove image"
                          >
                            <Icon name="close" className="text-[14px]" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-full h-24 rounded-xl bg-surface-container-low flex items-center justify-center text-on-surface-variant">
                          <Icon name="image" className="text-[32px]" />
                        </div>
                      )}
                      <label className="inline-flex items-center gap-2 px-space-md py-2 rounded-xl bg-surface-container text-primary font-label-sm text-label-sm cursor-pointer hover:bg-secondary hover:text-on-secondary transition-colors">
                        <Icon name="upload" className="text-[16px]" />
                        <span>{uploading === f.key ? 'Uploading...' : 'Upload Photo'}</span>
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp,image/gif"
                          className="hidden"
                          onChange={handleImageUpload(f.key)}
                          disabled={uploading === f.key}
                        />
                      </label>
                    </div>
                  )}
                  {f.type === 'select' && (
                    <select
                      className="w-full bg-surface-container-low rounded-xl px-space-md py-2.5 font-body-md text-body-md focus:ring-2 focus:ring-secondary/50 focus:outline-none"
                      value={form[f.key] || ''}
                      onChange={update(f.key)}
                    >
                      {f.options.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  )}
                  {f.type === 'checkbox' && (
                    <label className="flex items-center gap-2 font-body-md text-body-md text-on-surface">
                      <input
                        type="checkbox"
                        checked={!!form[f.key]}
                        onChange={update(f.key, 'checkbox')}
                        className="w-4 h-4"
                      />
                      {f.label}
                    </label>
                  )}
                </div>
              ))}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg hover:bg-secondary transition-all"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminContentManager;
