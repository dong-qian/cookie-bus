import React from "react";
import CreateProfileForm from "../components/CreateProfileForm";
import * as storage from "../api/storage";

const CreateProfile = ({ onBack, onSubmit, noProfile }) => {
  const handleSubmit = async (profile) => {
    const response = await storage.createProfile(profile);
    const { success, profiles } = response;
    if (success) {
      onSubmit(profiles);
    }
  };

  return (
    <CreateProfileForm
      onSubmit={handleSubmit}
      onBack={onBack}
      noProfile={noProfile}
    />
  );
};

export default CreateProfile;
