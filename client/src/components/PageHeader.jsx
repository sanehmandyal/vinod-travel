import React from 'react';

const PageHeader = ({ eyebrow, title, description }) => (
  <section className="relative w-full bg-primary text-on-primary py-16 sm:py-20 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80"
        alt="Mountain background"
        className="w-full h-full object-cover object-center filter brightness-50"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#03150e]/95 via-[#03150e]/85 to-[#03150e]/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#03150e] via-transparent to-black/20" />
    </div>
    <div className="relative z-10 max-w-max-width-content mx-auto px-gutter-mobile lg:px-gutter-desktop space-y-3">
      {eyebrow && (
        <span className="inline-block text-xs uppercase tracking-wider text-amber-300 font-bold bg-white/10 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
          {eyebrow}
        </span>
      )}
      <h1 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-sm">
        {title}
      </h1>
      {description && <p className="font-body-lg text-sm sm:text-base text-emerald-100/90 max-w-2xl leading-relaxed">{description}</p>}
    </div>
  </section>
);

export default PageHeader;
