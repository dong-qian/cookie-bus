import React from 'react';
import { Button, Input, Divider } from '../elements';

export const CookieList = ({ cookieList, onBack, onSearch }) => {
  const [query, setQuery] = React.useState('');
  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div>
      <div className="block text-md font-medium text-center uppercase mb-5">
        List of cookies
      </div>
      <div className="mb-5">
        <Input
          name="name"
          type="text"
          required
          onChange={handleChange}
          value={query}
          placeholder="Search"
        />
      </div>
      <Divider />
      {cookieList.length > 0 ? (
        <>
          {cookieList.map((cookie) => (
            <div className="break-all mb-3" key={cookie.name}>
              <div className="mb-1 text-secondary">{cookie.name}</div>
              <div className="text-sm ml-2 p-2 bg-primary rounded-md">
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
    </div>
  );
};
