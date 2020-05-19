import React from "react";

const Dropdown = ({ profiles, setSelectProfile, selectedProfile }) => {
  const [open, setOpen] = React.useState(false);
  const toggleDropdown = () => setOpen((preState) => !preState);
  const handleSelect = (profile) => {
    setSelectProfile(profile);
    toggleDropdown();
  };

  return (
    <div className="relative inline-block flex-1">
      <div>
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            onClick={() => setOpen((preState) => !preState)}
            className="inline-flex text-base bg-white leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none  focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
          >
            {selectedProfile.name}
            <svg
              className="-mr-1 ml-2 h-5 w-5 text-teal-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </span>
      </div>
      {open && (
        <div className="origin-top-left absolute left-0 mt-2 w-64 rounded-md shadow-lg z-50">
          <div className="rounded-md bg-white shadow-xs">
            <div className="py-1">
              {profiles.map((profile) => (
                <div
                  key={profile.name}
                  onClick={() => handleSelect(profile)}
                  className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                >
                  {profile.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
