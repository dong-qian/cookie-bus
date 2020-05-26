import React from 'react';
import { Button } from '../elements';
import * as chromeApi from '../api/chrome';
import { useProfileStore } from '../store';

export const ImportCookie = React.memo(() => {
  const { pState } = useProfileStore();
  const { currentProfile } = pState;
  const handleImport = async () => {
    if (
      !pState.currentProfile.allCookies &&
      pState.currentProfile.cookies.length === 0
    ) {
      return;
    }

    try {
      const allCookies = await chromeApi.getAllCookies(currentProfile);
      let requiredCookies = allCookies;
      if (!currentProfile.allCookies) {
        requiredCookies = allCookies.filter((cookie) =>
          currentProfile.cookies.includes(cookie.name)
        );
      }

      const activeTab = await chromeApi.getActiveTab();
      const activeStore = await chromeApi.getStoreByTab(activeTab);
      for (const cookie of requiredCookies) {
        await chromeApi.setCookie(cookie, activeTab, activeStore);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="mb-5 text-xl uppercase text-center">
        {currentProfile.name}
      </div>
      <Button secondary type="button" onClick={handleImport} disabled={false}>
        Import
      </Button>
    </>
  );
});
