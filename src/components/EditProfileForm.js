import React from "react";
import { Divider, Input, Button } from "../elements";

const EditProfileForm = ({ editProfile, onSubmit, onBack }) => {
  const [profile, setProfile] = React.useState({
    name: "",
    url: "",
    cookies: [],
    allCookies: false,
    default: true,
  });

  const [cookie, setCookie] = React.useState("");

  React.useEffect(() => {
    setProfile(editProfile);
  }, [editProfile]);

  const handleUpdateProfile = (e) => {
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

  const addCookie = () => {
    if (cookie) {
      setProfile({
        ...profile,
        cookies: [...profile.cookies, cookie],
      });
      setCookie("");
    }
  };

  const deleteCookie = (value) => {
    setProfile({
      ...profile,
      cookies: profile.cookies.filter((cookie) => cookie !== value),
    });
  };

  return (
    <form
      className="p-4 bg-white shadow-lg rounded-md"
      onSubmit={handleUpdateProfile}
    >
      <label
        htmlFor="profile"
        className="block text-md font-medium leading-5 text-gray-700"
      >
        Edit profile
      </label>
      <div className="mt-1 rounded-md shadow-sm mt-4">
        <Input name="name" type="text" placeholder={profile.name} disabled />
      </div>

      <div className="mt-1 rounded-md shadow-sm mt-4">
        <Input name="url" type="text" placeholder={profile.url} disabled />
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
      <div className="mt-2 p-2 text-gray-500 text-xs text-left rounded-md bg-gray-200">
        Uncheck to import specific cookies
      </div>
      <div className="relative flex items-start mt-3">
        <div className="absolute flex items-center h-5">
          <input
            name="default"
            type="checkbox"
            disabled={editProfile.default}
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

      <Divider color="border-green-500" />

      {!profile.allCookies && (
        <>
          <div className="block mt-2 text-left text-sm font-medium leading-5 text-gray-700">
            Cookies
          </div>
          <div className="mt-4 w-full inline-flex justify-between">
            <input
              name="cookie"
              type="text"
              value={cookie}
              onChange={(e) => setCookie(e.target.value)}
              placeholder="Cookie name"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-green focus:border-green-500 transition duration-150 ease-in-out"
            />
            <button
              type="button"
              onClick={addCookie}
              className="text-2xl ml-4 px-4 text-green-700 focus:outline-none hover:bg-green-600 hover:text-white rounded-md"
            >
              +
            </button>
          </div>

          <div className="w-full mt-4">
            {profile.cookies.map((cookie) => (
              <div
                className="inline-flex items-center w-full mb-2"
                key={cookie}
              >
                <div className="px-3 py-2 text-green-700 rounded-md bg-gray-200 flex-1 text-left">
                  {cookie}
                </div>
                <button
                  type="button"
                  onClick={() => deleteCookie(cookie)}
                  className="text-2xl ml-4 px-4 focus:outline-none text-red-600 focus:outline-none hover:bg-red-600 hover:text-white rounded-md"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </>
      )}

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

export default EditProfileForm;
