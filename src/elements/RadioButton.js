import React from 'react';

export const RadioButton = ({ label, name, checked, value, onChange }) => {
  return (
    <div className="flex items-center mr-4 mb-4">
      <input
        type="radio"
        className="hidden"
        name={name}
        checked={checked}
        value={value}
        onChange={onChange}
      />
      <label
        className={`${
          checked && 'text-secondary'
        } flex items-center cursor-pointer text-xl`}
      >
        <span
          className={`${
            checked && 'bg-secondary inner-white-shadow'
          } w-5 h-5 inline-block mr-2 rounded-full border border-grey flex-no-shrink`}
        ></span>
        {label}
      </label>
    </div>
  );
};
