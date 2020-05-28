import React from 'react';
import { useFeatureStore, useProfileStore } from '../store';
import {
  ImportCookie,
  CreateProfile,
  EditProfile,
  ChangeProfile,
  ShowAllCookies
} from '.';
import * as storage from '../api/storage';
import { WithCompletion } from '../components';

export const FeatureView = React.memo(() => {
  const { fState, fDispatch, fActionType } = useFeatureStore();
  const { pDispatch, pActionType } = useProfileStore();

  React.useLayoutEffect(() => {
    const fetchProfiles = async () => {
      const response = await storage.getData();
      const { success, profiles } = response;
      if (success && profiles.length > 0) {
        let defaultProfile = profiles.find((p) => p.default === true);
        if (!defaultProfile) {
          defaultProfile = profiles[0];
        }
        pDispatch({
          type: pActionType.SET_CURRENT_PROFILE,
          payload: defaultProfile
        });
        pDispatch({
          type: pActionType.UPDATE_PROFILES,
          payload: profiles
        });
        fDispatch({
          type: fActionType.IMPORT_COOKIE
        });
      } else {
        fDispatch({
          type: fActionType.CREATE_PROFILE
        });
      }
    };
    fetchProfiles();
  }, [
    fActionType.CREATE_PROFILE,
    fActionType.IMPORT_COOKIE,
    fDispatch,
    pActionType.SET_CURRENT_PROFILE,
    pActionType.UPDATE_PROFILES,
    pDispatch
  ]);

  const getCurrentFeature = () => {
    const { currentFeature } = fState;
    switch (currentFeature) {
      case fActionType.IMPORT_COOKIE:
        return <ImportCookie />;
      case fActionType.CREATE_PROFILE:
        return <CreateProfile />;
      case fActionType.CHANGE_PROFILE:
        return <ChangeProfile />;
      case fActionType.EDIT_PROFILE:
        return <EditProfile />;
      case fActionType.SHOW_COOKIE_LIST:
        return <ShowAllCookies />;
      default:
        return <ImportCookie />;
    }
  };

  return (
    <div className="w-full px-6 py-8">
      <WithCompletion>{getCurrentFeature()}</WithCompletion>
      {fState.error && (
        <div className="text-red-600 text-center mt-5">
          {fState.error.message}
        </div>
      )}
    </div>
  );
});
