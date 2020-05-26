import React from 'react';
import { CreateProfileForm } from '../components';
import * as storage from '../api/storage';
import { useProfileStore, useFeatureStore } from '../store';

export const CreateProfile = React.memo(() => {
  const { pState, pDispatch, pActionType } = useProfileStore();
  const { fDispatch, fActionType } = useFeatureStore();
  const handleSubmit = async (profile) => {
    const response = await storage.createProfile(profile);
    const { success, profiles } = response;
    if (success) {
      pDispatch({
        type: pActionType.UPDATE_PROFILES,
        payload: profiles
      });
      fDispatch({
        type: fActionType.IMPORT_COOKIE
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
