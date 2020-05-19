import React from "react";
import { Divider, Input, Button } from "../elements";

const CreateProfileForm = ({ onSubmit, onBack, noProfile }) => {
  const [profile, setProfile] = React.useState({
    name: "",
    url: "",
    cookies: [],
    allCookies: true,
    default: true,
  });

  const handleAddProfile = (e) => {
    e.preventDefault();
    const newProfile = {
      ...profile,
      name: profile.name.trim(),
      url: profile.url.trim(),
    };
    onSubmit(newProfile);
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  return (
    <form
      className="p-4 bg-white shadow-lg rounded-md"
      onSubmit={handleAddProfile}
    >
      <label
        htmlFor="profile"
        className="block text-dm font-medium leading-5 text-gray-700"
      >
        Create a profile
      </label>
      <div className="mt-1 rounded-md mt-4">
        <Input
          name="name"
          type="text"
          required
          onChange={handleChange}
          value={profile.name}
          placeholder="Profile Name (Unique)"
        />
        <div className="mt-2 ml-1 p-2 text-gray-500 text-xs text-left rounded-md bg-gray-200">
          Any name but unique to this extension
        </div>
      </div>

      <div className="mt-1 rounded-md mt-4">
        <Input
          name="url"
          type="text"
          required
          onChange={handleChange}
          value={profile.url}
          placeholder="Copy from (url) ?"
        />
        <div className="mt-2 ml-1 p-2 text-gray-500 text-xs text-left rounded-md bg-gray-200">
          Ex: www.google.com <br></br>
          This extension will copy all/required cookies from www.google.com to
          the tab user click import
        </div>
      </div>
      <div className="relative flex items-start mt-3">
        <div className="absolute flex items-center h-5">
          <input
            name="default"
            type="checkbox"
            onChange={handleChange}
            checked={profile.default}
            className="form-checkbox h-4 w-4 text-green-600 bg-green-300 transition duration-150 ease-in-out"
          />
        </div>
        <div className="pl-8 text-sm">
          <label
            htmlFor="comments"
            className="font-medium text-gray-700 tracking-wide"
          >
            Set as default profile
          </label>
        </div>
      </div>

      <Divider color="text-green-500" />

      <div
        className={`${
          noProfile ? "w-full block" : "grid grid-cols-2 gap-5"
        } mt-5`}
      >
        <Button type="submit" main>
          Save
        </Button>
        {!noProfile && (
          <Button type="button" onClick={onBack}>
            Back
          </Button>
        )}
      </div>
    </form>
  );
};

export default CreateProfileForm;
