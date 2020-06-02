import React from 'react';

export const Checkbox = ({ onClick, checked }) => {
  return (
    <div>
      <label className="custom-label flex">
        <div className="bg-primary shadow-md w-5 h-5 flex justify-center items-center mr-2">
          <input
            type="checkbox"
            className="hidden"
            checked={checked}
            onClick={onClick}
          />
          <svg
            className={`${
              !checked && 'hidden'
            } w-5 h-5 text-secondary pointer-events-none`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <span className="select-none text-primary-lighter">
          Copy from Incognito
        </span>
      </label>
    </div>
  );
};
