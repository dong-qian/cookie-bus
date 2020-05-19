import React from "react";

export const Button = (props) => {
  const defaultClass =
    "relative w-full py-3 inline-flex justify-center items-center rounded-md items-center focus:outline-none transition ease-in-out duration-150";

  let variants = "bg-gray-200 hover:bg-gray-400";

  if (props.main) {
    variants = "bg-green-600 hover:bg-green-400 text-white";
  }

  if (props.secondary) {
    variants = "bg-gray-900 hover:bg-gray-700 text-white";
  }

  if (props.disabled) {
    variants += " cursor-not-allowed opacity-25";
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
