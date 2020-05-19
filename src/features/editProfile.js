import React from "react";
import EditProfileForm from "../components/EditProfileForm";
import * as storage from "../api/storage";

const EditProfile = ({ onBack, onSubmit, editProfile }) => {
  const handleSubmit = async (profile) => {
    const response = await storage.updateProfile(profile);
    const { success, profiles } = response;
    if (success) {
      onSubmit(profiles);
    }
  };

  return (
    <EditProfileForm
      onSubmit={handleSubmit}
      onBack={onBack}
      editProfile={editProfile}
    />
  );
};

export default EditProfile;
