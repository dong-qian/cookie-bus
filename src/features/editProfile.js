import React from 'react';
import EditProfileForm from '../components/EditProfileForm';
import * as storage from '../api/storage';
import { useProfileStore, useFeatureStore } from '../store';

export const EditProfile = () => {
  const { pState, pDispatch, pActionType } = useProfileStore();
  const { fDispatch, fActionType } = useFeatureStore();

  const handleSubmit = async (profile) => {
    const response = await storage.updateProfile(profile);
    const { success, profiles } = response;
    if (success) {
      pDispatch({ type: pActionType.UPDATE_PROFILES, payload: profiles });
      fDispatch({ type: fActionType.CHANGE_PROFILE });
    }
  };

  return (
    <EditProfileForm
      onSubmit={handleSubmit}
      onBack={() => fDispatch({ type: fActionType.CHANGE_PROFILE })}
      editProfile={pState.editProfile}
    />
  );
};
