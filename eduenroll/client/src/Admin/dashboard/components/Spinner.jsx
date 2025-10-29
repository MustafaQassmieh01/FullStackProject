import React from 'react';

const Spinner = ({ size = 5 }) => (
  <div className={`w-${size} h-${size} border-2 border-t-2 border-gray-200 rounded-full animate-spin`} />
);

export default Spinner;
