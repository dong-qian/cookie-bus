import React from 'react';
import { Button } from '../elements';
import * as chromeApi from '../api/chrome';
import { useProfileStore } from '../store';
import { WithCompletion } from '../components';

export const ImportCookie = () => {
  const { pState } = useProfileStore();
  const [show, setShow] = React.useState(false);
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
      setShow(true);
      setTimeout(() => setShow(false), 500);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <WithCompletion show={show}>
      {pState.savedProfiles.length === 0 ? (
        <div className="text-center mt-4">No Profiles</div>
      ) : (
        <>
          <div className="mb-5 text-xl uppercase text-center">
            {currentProfile.name}
          </div>
          <Button
            secondary
            type="button"
            onClick={handleImport}
            disabled={false}
          >
            Import
          </Button>
        </>
      )}
    </WithCompletion>
  );
};
