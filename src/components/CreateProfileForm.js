import React from 'react';
import { Divider, Input, Button, Toggle } from '../elements';

export const CreateProfileForm = ({ onSubmit, onBack, noProfile }) => {
  const [profile, setProfile] = React.useState({
    name: '',
    url: '',
    cookies: [],
    allCookies: true,
    default: true
  });

  const handleAddProfile = (e) => {
    e.preventDefault();
    const newProfile = {
      ...profile,
      name: profile.name.trim(),
      url: profile.url.trim()
    };
    onSubmit(newProfile);
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value
    });
  };

  const toogleDefault = () => {
    setProfile({
      ...profile,
      default: !profile.default
    });
  };

  return (
    <form onSubmit={handleAddProfile}>
      <div className="block text-md font-medium text-center uppercase">
        Create profile
      </div>
      <div className="mt-5">
        <Input
          name="name"
          type="text"
          required
          onChange={handleChange}
          value={profile.name}
          placeholder="Profile Name (unique)"
        />
      </div>

      <div className="mt-1 mt-4">
        <Input
          name="url"
          type="text"
          required
          onChange={handleChange}
          value={profile.url}
          placeholder="Starts with https:// or http://"
        />
        <div className="mt-3 text-primary-lighter text-sm">
          Ex: https://www.example.com<br></br>
        </div>
      </div>
      <div className="flex justify-between my-4">
        <div className="text-sm">
          <label htmlFor="comments" className="font-medium">
            Set as default profile
          </label>
        </div>
        <Toggle on={profile.default} onClick={toogleDefault} />
      </div>

      <Divider />

      <div
        className={`${
          noProfile ? 'w-full block' : 'grid grid-cols-2 gap-5'
        } mt-5`}
      >
        <Button type="submit" secondary>
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
