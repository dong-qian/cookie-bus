import React from 'react';
import ReactTooltip from 'react-tooltip';

export const Toggle = (props) => {
  const { on, onClick } = props;
  return (
    <span
      className={`${
        on ? 'bg-secondary' : 'bg-primary'
      } relative text-left inline-block flex-shrink-0 h-6 w-12 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`}
      tabIndex="0"
      onClick={onClick}
    >
      <span
        className={`${
          on ? 'translate-x-6' : 'translate-x-0'
        } relative inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200`}
      >
        <span
          className={`${
            on
              ? 'opacity-0 ease-out duration-100'
              : 'opacity-100 ease-in duration-200'
          } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
        >
          <svg
            className="h-3 w-3 text-gray-400"
            fill="none"
            viewBox="0 0 12 12"
          >
            <path
              d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span
          className={`${
            on
              ? 'opacity-100 ease-in duration-200'
              : 'opacity-0 ease-out duration-100'
          } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
        >
          <svg
            className="h-3 w-3 text-secondary"
            fill="currentColor"
            viewBox="0 0 12 12"
          >
            <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
          </svg>
        </span>
      </span>
    </span>
  );
};

export const ToggleWithLabel = (props) => (
  <div className="flex justify-between mt-4">
    <div className="text-sm flex items-center">
      <label
        className={`${
          props.on && 'text-secondary-lighter text-base'
        } font-medium mr-2`}
      >
        {props.label}
      </label>
    </div>
    <Toggle {...props} />
  </div>
);

export const ToggleWithLabelAndTooltip = (props) => (
  <div className="flex justify-between mt-4">
    <div className="text-sm flex items-center">
      <label
        className={`${
          props.on && 'text-secondary-lighter text-base'
        } font-medium mr-2`}
      >
        {props.label}
      </label>
      <div>
        <p data-tip data-for={props.label}>
          <svg
            className="h-4 w-4 cursor-pointer"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            ></path>
          </svg>
        </p>
        <ReactTooltip
          multiline
          id={props.label}
          type="info"
          effect="solid"
          delayShow={150}
          delayHide={150}
        >
          {props.tooltip}
        </ReactTooltip>
      </div>
    </div>
    <Toggle {...props} />
  </div>
);
