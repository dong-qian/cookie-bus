import React from 'react';

export const Tooltip = ({ content, children }) => {
  const [show, setShow] = React.useState(false);
  return (
    <div className="relative">
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>
      <div
        className={`${
          show ? 'block' : 'hidden'
        } absolute flex justify-center py-2 px-5 shadow-2xl rounded-md text-xs bg-white text-primary bottom-0 inset-x-0 -mb-16 mx-3 text-center z-50 transtion ease-in-out duration-150`}
      >
        <div className="absolute h-4 w-4 bg-white top-0 transform rotate-45 translate-y-1 -mt-2 z-10"></div>
        <div>{content}</div>
      </div>
    </div>
  );
};
