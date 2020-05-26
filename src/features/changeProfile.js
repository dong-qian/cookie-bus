import React from 'react';
import { ProfileSelection } from '../components';
import * as storage from '../api/storage';
import { useFeatureStore, useProfileStore } from '../store';

export const ChangeProfile = React.memo(() => {
  const { pState, pDispatch, pActionType } = useProfileStore();
  const { fDispatch, fActionType } = useFeatureStore();

  const { savedProfiles, currentProfile } = pState;

  const onDelete = async (profile) => {
    const data = await storage.deleteProfile(profile);
    const { success, profiles } = data;
    if (success) {
      pDispatch({ type: pActionType.UPDATE_PROFILES, payload: profiles });
      if (profiles.length === 0) {
        fDispatch({ type: fActionType.CREATE_PROFILE });
      }
    }
  };

  const onSelect = (profile) => {
    pDispatch({
      type: pActionType.SET_CURRENT_PROFILE,
      payload: profile
    });

    fDispatch({
      type: fActionType.IMPORT_COOKIE
    });
  };

  const onEdit = (profile) => {
    pDispatch({
      type: pActionType.SET_EDIT_PROFILE,
      payload: profile
    });
    fDispatch({
      type: fActionType.EDIT_PROFILE
    });
  };

  return savedProfiles.length > 0 ? (
    <>
      <div className="block text-md font-medium text-center uppercase">
        Change Profile
      </div>
      <div className="w-full mt-5 grid gap-4">
        {savedProfiles.map((profile) => {
          const activeProfile = currentProfile.name === profile.name;
          return (
            <ProfileSelection
              key={profile.name}
              profile={profile}
              currentProfile={currentProfile}
              activeProfile={activeProfile}
              onSelect={onSelect}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          );
        })}
      </div>
    </>
  ) : (
    <div className="text-center">No Profiles, Please create one</div>
  );
});
