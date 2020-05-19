import React from "react";
import ProfileSelection from "../components/ProfileSelection";
import * as storage from "../api/storage";

const ProfileList = ({
  profiles,
  currentProfile,
  onSelect,
  onEdit,
  onSubmit,
}) => {
  const onDelete = async (profile) => {
    const data = await storage.deleteProfile(profile);
    const { success, profiles } = data;
    if (success) {
      onSubmit(profiles);
    }
  };

  return (
    <div className="w-full p-4 grid gap-4 rounded-md bg-white shadow-lg">
      {profiles.map((profile) => {
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
  );
};

export default ProfileList;
