import React from 'react';
import { Button } from '../elements';

export const ProfileSelection = ({
  profile,
  activeProfile,
  onSelect,
  onEdit,
  onDelete
}) => {
  return (
    <div className="grid grid-cols-8 gap-4">
      <div className="col-span-6">
        <Button onClick={() => onSelect(profile)} main={activeProfile}>
          {activeProfile && (
            <div className="absolute left-0 ml-4">
              <svg
                className="text-secondary h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
          )}
          <div>{profile.name}</div>
        </Button>
      </div>
      <div
        className="col-span-1 flex items-center cursor-pointer"
        onClick={() => onEdit(profile)}
      >
        <svg
          className="w-5 fill-current text-primary-lighter hover:text-secondary"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
          <path
            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      </div>
      <div
        className="col-span-1 flex items-center cursor-pointer"
        onClick={() => onDelete(profile)}
      >
        <svg
          className="w-5 fill-current text-primary-lighter hover:text-secondary"
          fill="currentColor "
          viewBox="0 0 20 20"
        >
          <path
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      </div>
    </div>
  );
};
