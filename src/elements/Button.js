import React from 'react';

export const Button = (props) => {
  const defaultClass =
    'relative w-full py-3 justify-center items-center rounded-md items-center';

  let variants = 'bg-gray-200 hover:bg-gray-400 text-gray-900';

  if (props.main) {
    variants = 'bg-primary hover:bg-primary-lighter';
  }

  if (props.secondary) {
    variants = 'bg-secondary hover:bg-secondary-lighter';
  }

  if (props.disabled) {
    variants += ' cursor-not-allowed opacity-25';
  }

  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type}
      className={`${defaultClass} ${variants}`}
    >
      {props.children}
    </button>
  );
};
