import React from 'react';
import {
  Divider,
  Input,
  Button,
  ToggleWithLabel,
  ToggleWithLabelAndTooltip
} from '../elements';

export const EditProfileForm = ({ editProfile, onSubmit, onBack }) => {
  const [profile, setProfile] = React.useState({
    name: '',
    url: '',
    cookies: [],
    allCookies: false,
    default: false,
    keepOriginalDomain: false
  });

  const [cookie, setCookie] = React.useState('');

  React.useLayoutEffect(() => {
    setProfile(editProfile);
  }, [editProfile]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const newProfile = {
      ...profile,
      name: profile.name.trim(),
      url: profile.url.trim()
    };
    onSubmit(newProfile);
  };

  const addCookie = () => {
    if (cookie) {
      setProfile({
        ...profile,
        cookies: [...profile.cookies, cookie]
      });
      setCookie('');
    }
  };

  const deleteCookie = (value) => {
    setProfile({
      ...profile,
      cookies: profile.cookies.filter((cookie) => cookie !== value)
    });
  };

  const toggoleAllCookies = () => {
    setProfile({
      ...profile,
      allCookies: !profile.allCookies
    });
  };

  const toogleDefault = () => {
    setProfile({
      ...profile,
      default: !profile.default
    });
  };

  const toogleKeepOriginalDomain = () => {
    setProfile({
      ...profile,
      keepOriginalDomain: !profile.keepOriginalDomain
    });
  };

  return (
    <form className="" onSubmit={handleUpdateProfile} autoComplete="off">
      <div className="block text-md font-medium text-center uppercase">
        Edit Profile
      </div>
      <div className="mt-4">
        <Input name="name" type="text" placeholder={profile.name} disabled />
      </div>

      <div className="mt-4">
        <Input name="url" type="text" placeholder={profile.url} disabled />
      </div>

      <ToggleWithLabel
        label="Import all cookies"
        on={profile.allCookies}
        onClick={toggoleAllCookies}
      />

      <div className="text-primary-lighter text-xs">
        Uncheck to import specific cookies
      </div>

      <ToggleWithLabel
        label="Set as default profile"
        on={profile.default}
        onClick={toogleDefault}
      />

      <ToggleWithLabelAndTooltip
        label="Keep original domain"
        on={profile.keepOriginalDomain}
        onClick={toogleKeepOriginalDomain}
        tooltip={
          <>
            <p>If you choose to import cookies from</p>
            <p>the incognito window with the same domain,</p>
            <p>you should enable this option to make sure</p>
            <p>the imported cookies have the exactly same</p>
            <p>domain. This is especially useful when the</p>
            <p>the site has a subdomain like [sub.example.com].</p>
          </>
        }
      />
      <div className="text-primary-lighter text-xs mt-2">
        Used for importing cookie to the same domain
      </div>

      <Divider color="border-green-500" />

      {!profile.allCookies && (
        <>
          <div className="block mt-2 text-left text-sm font-medium">
            Cookies
          </div>
          <div className="mt-4 w-full inline-flex justify-between">
            <Input
              name="cookie"
              type="text"
              value={cookie}
              onChange={(e) => setCookie(e.target.value)}
              placeholder="Cookie name"
            />
            <button
              type="button"
              onClick={addCookie}
              className="text-2xl ml-4 px-4 hover:bg-secondary hover:text-white"
            >
              +
            </button>
          </div>

          <div className="w-full mt-4">
            {profile.cookies.map((cookie) => (
              <div
                className="inline-flex items-center w-full text-secondary"
                key={cookie}
              >
                <div className="px-3 py-2 flex-1 text-left">{cookie}</div>
                <button
                  type="button"
                  onClick={() => deleteCookie(cookie)}
                  className="text-2xl px-4 text-red-600 focus:outline-none hover:bg-red-600 hover:text-white"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="grid grid-cols-2 gap-5 mt-5">
        <Button type="submit" secondary>
          Save
        </Button>

        <Button type="button" onClick={onBack}>
          Back
        </Button>
      </div>
    </form>
  );
};
