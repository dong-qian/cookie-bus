import React from "react";
import { Divider, Input, Button } from "../elements";

const CreateProfileForm = ({ onSubmit, onBack }) => {
  const [profile, setProfile] = React.useState({
    name: "",
    url: "",
    cookies: [],
    allCookies: true,
    default: true,
  });

  const handleAddProfile = (e) => {
    e.preventDefault();
    onSubmit(profile);
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
      <div className="mt-1 rounded-md shadow-sm mt-4">
        <Input
          name="name"
          type="text"
          required
          onChange={handleChange}
          value={profile.name}
          placeholder="Name (Unique)"
        />
      </div>

      <div className="mt-1 rounded-md shadow-sm mt-4">
        <Input
          name="url"
          type="text"
          required
          onChange={handleChange}
          value={profile.url}
          placeholder="Copy from (URL) ?"
        />
      </div>

      <div className="relative flex items-start mt-4">
        <div className="absolute flex items-center h-5">
          <input
            name="allCookies"
            type="checkbox"
            onChange={handleChange}
            checked={profile.allCookies}
            className="form-checkbox h-4 w-4 text-green-600 bg-green-300 transition duration-150 ease-in-out"
          />
        </div>
        <div className="pl-8 text-sm leading-5">
          <label
            htmlFor="comments"
            className="font-medium text-gray-700 tracking-wide"
          >
            Import all cookies
          </label>
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
            Default profile
          </label>
        </div>
      </div>

      <Divider />

      <div className="grid grid-cols-2 gap-5 mt-5">
        <Button type="submit" main>
          Save
        </Button>

        <Button type="button" onClick={onBack}>
          Back
        </Button>
      </div>
    </form>
  );
};

export default CreateProfileForm;
