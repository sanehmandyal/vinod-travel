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
      let errorMessage = 'Invalid email or password';
      if (err?.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err?.response?.status === 500) {
        errorMessage = 'Server error (500): Serverless function crashed or configuration error.';
      } else if (err?.response?.status === 503) {
        errorMessage = 'Database unavailable (503). Check MongoDB Atlas IP whitelist & connection.';
      } else if (err?.response?.status === 404) {
        errorMessage = 'Backend API not found (404). Check backend configuration or Vercel API routes.';
      } else if (err?.message === 'Network Error' || !err?.response) {
        errorMessage = 'Cannot reach API server. Please check backend deployment & CORS settings.';
      }
      setStatus({ loading: false, error: errorMessage });
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
        <div className="pt-2 border-t border-surface-container text-center space-y-1">
          <p className="text-xs text-on-surface-variant">
            Admin Login: <span className="font-semibold text-primary">admin@vinodtravelsuna.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
