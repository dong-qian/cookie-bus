import React from 'react';
import { Button, ToggleWithLabelAndTooltip, Divider } from '../elements';
import * as chromeApi from '../api/chrome';
import { useProfileStore, useFeatureStore } from '../store';

const NORMAL_MODE_STORE = '0';
const INCOGNITO_MODE_STORE = '1';

export const ImportCookie = () => {
  const { pState } = useProfileStore();
  const { fDispatch, fActionType } = useFeatureStore();
  const [incognitoMode, setIncognitoMode] = React.useState(false);

  const { currentProfile } = pState;
  const handleImport = async () => {
    try {
      const allCookies = await chromeApi.getAllCookiesByStore(
        currentProfile.url,
        incognitoMode ? INCOGNITO_MODE_STORE : NORMAL_MODE_STORE
      );
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

  const toogleWindowMode = () => {
    setIncognitoMode((preState) => !preState);
  };

  return pState.savedProfiles.length === 0 ? (
    <div className="text-center mt-4">No Profiles</div>
  ) : (
    <>
      <div className="mb-5 text-xl uppercase text-center">
        {currentProfile.name}
      </div>
      <div className="mb-5">
        <Button secondary type="button" onClick={handleImport} disabled={false}>
          Import
        </Button>
      </div>
      <Divider />
      <div className="mt-5 text-primary-lighter">
        <ToggleWithLabelAndTooltip
          label="Import from Incognito"
          tooltip={
            <>
              <p>Incognito mode uses a separate cookie store. </p>
              <p>If you intend to import the cookies from the</p>
              <p>Incognito tab, make sure to enable this option.</p>
            </>
          }
          on={incognitoMode}
          onClick={toogleWindowMode}
        />
      </div>
    </>
  );
};
