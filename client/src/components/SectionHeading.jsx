import React from 'react';

const SectionHeading = ({ eyebrow, title, description, action, align = 'between' }) => (
  <div
    className={`flex flex-col md:flex-row md:items-end gap-space-md ${
      align === 'between' ? 'justify-between' : ''
    }`}
  >
    <div className="space-y-space-xs max-w-xl">
      {eyebrow && (
        <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
          {eyebrow}
        </span>
      )}
      <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-primary tracking-tight font-bold">
        {title}
      </h2>
      {description && <p className="font-body-md text-body-md text-on-surface-variant">{description}</p>}
    </div>
    {action}
  </div>
);

export default SectionHeading;
