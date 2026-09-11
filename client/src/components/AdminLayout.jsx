import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Icon from './Icon';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { to: '/admin/bookings', label: 'Bookings', icon: 'event_note' },
  { to: '/admin/vehicles', label: 'Fleet', icon: 'directions_car' },
  { to: '/admin/destinations', label: 'Routes', icon: 'route' },
  { to: '/admin/tour-packages', label: 'Tour Packages', icon: 'landscape' },
  { to: '/admin/gallery', label: 'Gallery', icon: 'photo_library' },
  { to: '/admin/reviews', label: 'Reviews', icon: 'reviews' },
  { to: '/admin/enquiries', label: 'Enquiries', icon: 'mail' },
  { to: '/admin/settings', label: 'Settings', icon: 'settings' },
];

const AdminLayout = ({ children, title }) => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-surface flex">
      <aside className="hidden md:flex md:flex-col w-64 bg-primary text-on-primary p-space-md shrink-0">
        <div className="flex items-center gap-2 pb-space-lg">
          <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-secondary-fixed">
            <Icon name="directions_car" className="text-[20px]" />
          </div>
          <div>
            <div className="font-title-md text-title-md font-bold">Vinod Travels</div>
            <div className="text-label-sm font-label-sm text-primary-fixed-dim">Admin Panel</div>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-space-sm py-2.5 rounded-xl font-title-md text-title-md transition-colors ${
                  isActive ? 'bg-primary-container text-on-primary' : 'text-primary-fixed-dim hover:bg-primary-container/60'
                }`
              }
            >
              <Icon name={l.icon} className="text-[20px]" />
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="pt-2 border-t border-primary-container/60 space-y-1">
          <a
            href="/"
            className="flex items-center gap-2 px-space-sm py-2 rounded-xl font-title-md text-title-md text-secondary-fixed hover:bg-primary-container/60 transition-colors"
          >
            <Icon name="arrow_back" className="text-[20px]" />
            Back to Website
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-space-sm py-2 rounded-xl font-title-md text-title-md text-primary-fixed-dim hover:bg-primary-container/60 transition-colors text-left"
          >
            <Icon name="logout" className="text-[20px]" />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <header className="bg-surface-container-lowest border-b border-surface-container px-space-md md:px-space-xl py-space-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-headline-sm text-headline-sm text-primary font-bold">{title}</h1>
          </div>
          <div className="flex items-center gap-space-sm">
            <a
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm hover:bg-secondary hover:text-on-secondary transition-colors"
            >
              <Icon name="visibility" className="text-[16px]" />
              <span>View Site</span>
            </a>
            <span className="hidden sm:block font-body-sm text-body-sm text-on-surface-variant">{auth?.name}</span>
            <div className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
              <Icon name="person" className="text-[20px]" />
            </div>
            <button
              onClick={handleLogout}
              className="md:hidden w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-primary"
              aria-label="Logout"
            >
              <Icon name="logout" className="text-[18px]" />
            </button>
          </div>
        </header>
        <div className="p-space-md md:p-space-xl">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
