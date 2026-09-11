import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState({ loading: false, error: '' });

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '' });
    try {
      await login(form.email, form.password);
      navigate('/admin/dashboard');
    } catch (err) {
      setStatus({ loading: false, error: err?.response?.data?.message || 'Invalid credentials' });
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-gutter-mobile">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl shadow-2xl p-space-xl space-y-space-md">
        <div className="flex flex-col items-center gap-2 pb-space-sm">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-secondary-fixed">
            <Icon name="directions_car" className="text-[28px]" />
          </div>
          <h1 className="font-headline-sm text-headline-sm text-primary font-bold">Vinod Travels Admin</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Sign in to manage bookings &amp; content</p>
        </div>
        <form className="space-y-space-sm" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="font-label-sm text-label-sm text-on-surface-variant">Email</label>
            <input
              type="email"
              className="w-full bg-surface-container-low rounded-xl px-space-md py-2.5 font-body-md text-body-md focus:ring-2 focus:ring-secondary/50 focus:outline-none"
              value={form.email}
              onChange={update('email')}
              required
            />
          </div>
          <div className="space-y-1">
            <label className="font-label-sm text-label-sm text-on-surface-variant">Password</label>
            <input
              type="password"
              className="w-full bg-surface-container-low rounded-xl px-space-md py-2.5 font-body-md text-body-md focus:ring-2 focus:ring-secondary/50 focus:outline-none"
              value={form.password}
              onChange={update('password')}
              required
            />
          </div>
          {status.error && <p className="text-body-sm text-error">{status.error}</p>}
          <button
            type="submit"
            disabled={status.loading}
            className="w-full py-3 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg hover:bg-secondary transition-all disabled:opacity-60"
          >
            {status.loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="text-body-sm text-on-surface-variant text-center">
          Forgot your password? Contact the system administrator.
        </p>
      </div>
    </div>
  );
};

export default Login;
