import React from 'react';
import { useFeatureStore } from '../store';

export const WithCompletion = ({ children }) => {
  const { fState } = useFeatureStore();
  const {
    completion: { show, message }
  } = fState;
  return (
    <div className="relative">
      <div
        className={`${
          show && 'opacity-25'
        } transition ease-in-out duration-150`}
      >
        {children}
      </div>
      {show && (
        <div
          className={`absolute inset-0 flex flex-col justify-center items-center`}
        >
          <svg
            className="w-24 text-secondary"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
              fillRule="evenodd"
            ></path>
          </svg>
          <div>{message}</div>
        </div>
      )}
    </div>
  );
};
