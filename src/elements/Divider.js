import React from 'react';

export const Divider = (props) => {
  const defaultClass = 'border my-4';
  let variants = 'border-secondary';
  if (props.color) {
    variants = props.color;
  }
  return <div className={`${defaultClass} ${variants}`}></div>;
};
