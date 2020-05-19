import React from "react";

export const Input = (props) => {
  const defaultClass =
    "appearance-none block w-full px-3 py-2 rounded-md placeholder-gray-400 border focus:outline-none focus:shadow-outline-green focus:border-green-600 transition duration-150 ease-in-out";
  let variants = "";
  if (props.disabled) {
    variants += "bg-gray-200 cursor-not-allowed";
  }
  return (
    <input
      {...props}
      required={props.required}
      disabled={props.disabled}
      type={props.type}
      required={props.required}
      className={`${defaultClass} ${variants}`}
    />
  );
};
