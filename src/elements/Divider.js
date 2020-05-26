import React from 'react';

export const Divider = (props) => {
  const defaultClass = 'border my-4';
  let variants = 'border-primary-lighter';

  if (props.secondary) {
    variants = 'border-secondary';
  }

  return <div className={`${defaultClass} ${variants}`}></div>;
};
