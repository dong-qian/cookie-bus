import React from 'react';
import { useProfileStore, useFeatureStore } from '../store';
import { CookieList } from '../components';

export const ShowAllCookies = () => {
  const { pState } = useProfileStore();
  const [filteredList, setFilteredList] = React.useState([]);
  const { fDispatch, fActionType } = useFeatureStore();

  React.useLayoutEffect(() => {
    setFilteredList(pState.currentCookies);
  }, [pState.currentCookies]);

  const handleSearch = (query) => {
    setFilteredList(
      pState.currentCookies.filter((cookie) => {
        const cookieName = cookie.name.toLowerCase();
        const searchQeury = query.toLowerCase();
        return cookieName.includes(searchQeury);
      })
    );
  };

  return (
    <CookieList
      cookieList={filteredList}
      onSearch={handleSearch}
      onBack={() => fDispatch({ type: fActionType.IMPORT_COOKIE })}
    />
  );
};
