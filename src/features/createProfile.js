import React from 'react';
import { CreateProfileForm } from '../components';
import * as storage from '../api/storage';
import { useProfileStore, useFeatureStore } from '../store';
const urlPattern = /^(https?):\/\/[^\s]*$/;

export const CreateProfile = React.memo(() => {
  const { pState, pDispatch, pActionType } = useProfileStore();
  const { fDispatch, fActionType } = useFeatureStore();
  const handleSubmit = async (profile) => {
    if (urlPattern.test(profile.url)) {
      const response = await storage.createProfile(profile);
      const { success, profiles } = response;
      if (success) {
        pDispatch({
          type: pActionType.UPDATE_PROFILES,
          payload: profiles
        });
        pDispatch({
          type: pActionType.SET_CURRENT_PROFILE,
          payload: profile
        });
        fDispatch({
          type: fActionType.IMPORT_COOKIE
        });
      }
    } else {
      fDispatch({
        type: fActionType.SHOW_ERROR,
        payload: {
          show: true,
          message: 'Url must starts with https:// or http://'
        }
      });
    }
  };

  return (
    <CreateProfileForm
      onSubmit={handleSubmit}
      onBack={() => fDispatch({ type: fActionType.IMPORT_COOKIE })}
      noProfile={pState.savedProfiles.length === 0}
    />
  );
});
