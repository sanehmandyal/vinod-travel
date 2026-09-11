import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';

const NotFound = () => (
  <section className="w-full min-h-[70vh] flex flex-col items-center justify-center text-center px-gutter-mobile space-y-space-md pt-20">
    <Icon name="signpost" className="text-[64px] text-secondary" />
    <h1 className="font-headline-lg text-headline-lg text-primary font-bold">Page Not Found</h1>
    <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
      The page you're looking for took a wrong turn on the mountain road. Let's get you back on route.
    </p>
    <Link to="/" className="inline-flex items-center gap-2 px-space-lg py-3 rounded-full bg-primary text-on-primary font-label-lg text-label-lg hover:bg-secondary transition-all">
      <Icon name="home" className="text-[18px]" />
      Back to Home
    </Link>
  </section>
);

export default NotFound;
