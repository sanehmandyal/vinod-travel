import React from 'react';

// Small helper so Material Symbols icons are used consistently.
const Icon = ({ name, className = '', style }) => (
  <span className={`material-symbols-outlined ${className}`} style={style}>
    {name}
  </span>
);

export default Icon;
