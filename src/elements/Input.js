import React from 'react';

export const Input = (props) => {
  const defaultClass = 'w-full h-full px-6 py-3';

  let variants = 'bg-primary';

  if (props.disabled) {
    variants = 'bg-primary-lighter cursor-not-allowed';
  }
  return (
    <input
      {...props}
      required={props.required}
      disabled={props.disabled}
      type={props.type}
      className={`${defaultClass} ${variants}`}
    />
  );
};
