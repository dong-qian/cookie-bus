import React from 'react';
import { Button } from '../elements';

export const CookieList = ({ cookieList, onBack, onSearch, deleteCookie }) => {
  return (
    <>
      {cookieList.length > 0 ? (
        <>
          {cookieList.map((cookie) => (
            <div className="break-all mb-3" key={cookie.name}>
              <div className="flex justify-between mb-1 text-secondary">
                <div className="col-span-6">{cookie.name}</div>
                <div onClick={() => deleteCookie(cookie)}>
                  <svg
                    className="h-4 w-4 text-white hover:text-red-600 cursor-pointer"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="items-center text-sm ml-2 p-2 bg-primary rounded-md">
                {cookie.value}
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="text-center mt-4">No Cookies found</div>
      )}
      <div className="mt-8">
        <Button type="button" onClick={onBack}>
          Back
        </Button>
      </div>
    </>
  );
};
