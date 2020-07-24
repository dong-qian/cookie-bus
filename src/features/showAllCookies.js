import React from 'react';
import { useFeatureStore, useCookieStore } from '../store';
import { CookieList } from '../components';
import Cookies from 'js-cookie';
import { Divider, Input, Button } from '../elements';

export const ShowAllCookies = () => {
  const [filteredList, setFilteredList] = React.useState([]);
  const [showAddNewCookie, setShowAddNewCookie] = React.useState(false);
  const [cookieName, setCookieName] = React.useState('');
  const [cookieValue, setCookieValue] = React.useState('');
  const { fDispatch, fActionType } = useFeatureStore();
  const { cDispatch, cActionType } = useCookieStore();
  const { cState } = useCookieStore();

  React.useLayoutEffect(() => {
    setFilteredList(cState.cookies);
  }, [cState.cookies]);

  const addCookie = () => {
    if (cookieName && cookieValue) {
      Cookies.set(cookieName, cookieValue);
      const cookies = Cookies.get();
      cDispatch({
        type: cActionType.SET_COOKIES,
        payload: Object.keys(cookies).map((key) => ({
          name: key,
          value: cookies[key]
        }))
      });
      setCookieName('');
      setCookieValue('');
    }
  };

  const toggleAddNewCookie = () => setShowAddNewCookie((preState) => !preState);

  const handleSearch = (e) => {
    setFilteredList(
      cState.cookies.filter((cookie) => {
        const cookieName = cookie.name.toLowerCase();
        const searchQeury = e.target.value.toLowerCase();
        return cookieName.includes(searchQeury);
      })
    );
  };

  const handleDeleteCookie = (cookie) => {
    Cookies.remove(cookie.name);
    const cookies = Cookies.get();
    cDispatch({
      type: cActionType.SET_COOKIES,
      payload: Object.keys(cookies).map((key) => ({
        name: key,
        value: cookies[key]
      }))
    });
  };

  return (
    <>
      <div className="block text-md font-medium text-center uppercase mb-5">
        List of cookies
      </div>
      <div className="mb-5">
        <Input
          name="name"
          type="text"
          required
          onChange={handleSearch}
          placeholder="Search"
        />
      </div>

      <div className="flex w-full justify-between mt-2 text-left text-sm font-medium">
        <div>Add a new cookie</div>
        <div onClick={toggleAddNewCookie} className="cursor-pointer">
          {!showAddNewCookie ? (
            <svg
              className="h-5 w-5 hover:text-secondary cursor-pointer"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          ) : (
            <svg
              className="h-5 w-5 hover:text-secondary cursor-pointer"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          )}
        </div>
      </div>
      {showAddNewCookie && (
        <div className="mt-4 w-full">
          <div className="mb-3">
            <Input
              name="name"
              type="text"
              onChange={(e) => setCookieName(e.target.value)}
              value={cookieName}
              placeholder="Cookie name"
            />
          </div>
          <div className="mb-3">
            <Input
              name="value"
              type="text"
              onChange={(e) => setCookieValue(e.target.value)}
              value={cookieValue}
              placeholder="Cookie value"
            />
          </div>
          <Button secondary type="button" onClick={addCookie}>
            Add
          </Button>
        </div>
      )}
      <Divider />
      <CookieList
        cookieList={filteredList}
        onBack={() => fDispatch({ type: fActionType.IMPORT_COOKIE })}
        deleteCookie={handleDeleteCookie}
      />
    </>
  );
};
