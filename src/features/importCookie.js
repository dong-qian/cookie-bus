import React from 'react';
import { Button } from '../elements';
import * as chromeApi from '../api/chrome';
import { useProfileStore, useFeatureStore } from '../store';

export const ImportCookie = () => {
  const { pState } = useProfileStore();
  const { fDispatch, fActionType } = useFeatureStore();

  const { currentProfile } = pState;
  const handleImport = async () => {
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
        await chromeApi.setCookie(
          cookie,
          activeTab,
          activeStore,
          currentProfile
        );
      }
      fDispatch({
        type: fActionType.SHOW_COMPLETION,
        payload: { show: true, message: 'Cookies are imported' }
      });
      fDispatch({
        type: fActionType.SHOW_ERROR,
        payload: { show: false, message: '' }
      });
      setTimeout(
        () =>
          fDispatch({
            type: fActionType.SHOW_COMPLETION,
            payload: { show: false, message: '' }
          }),
        500
      );
    } catch (err) {
      fDispatch({
        type: fActionType.SHOW_ERROR,
        payload: { show: true, message: err }
      });
    }
  };

  return pState.savedProfiles.length === 0 ? (
    <div className="text-center mt-4">No Profiles</div>
  ) : (
    <>
      <div className="mb-5 text-xl uppercase text-center">
        {currentProfile.name}
      </div>
      <Button secondary type="button" onClick={handleImport} disabled={false}>
        Import
      </Button>
    </>
  );
};
