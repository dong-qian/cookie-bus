import React from "react";
import EditProfileForm from "../components/EditProfileForm";
import * as storage from "../api/storage";

const EditProfile = ({ onBack, onSubmit, editProfile }) => {
  const handleSubmit = async (profile) => {
    console.log("profile", profile);
    const response = await storage.updateProfile(profile);
    const { success, profiles } = response;
    console.log("response", response);
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
