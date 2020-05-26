import React from 'react';
import { Tooltip } from '../elements';

export const ActionBar = ({ actions }) => {
  return (
    <div className="w-full grid grid-cols-4 shadow-2xl divide-x-2 divide-secondary-dark divide-opacity-25">
      {actions.map((a) => (
        <React.Fragment key={a.name}>
          <Tooltip content={a.desc}>
            <div
              onClick={a.action}
              className="p-3 flex flex-row justify-center items-center w-full h-full bg-primary hover:bg-secondary cursor-pointer"
            >
              <a.Icon />
            </div>
          </Tooltip>
        </React.Fragment>
      ))}
    </div>
  );
};
