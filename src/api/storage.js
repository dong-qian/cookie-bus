export const saveData = async (data) => {
  const cookie = JSON.stringify(data);
  await localStorage.setItem("cookie-bus", cookie);
};

export const getData = async () => {
  try {
    const data = await localStorage.getItem("cookie-bus");
    if (data) {
      return {
        success: true,
        profiles: JSON.parse(data),
      };
    } else {
      return {
        success: true,
        profiles: [],
      };
    }
  } catch (err) {
    return {
      success: false,
      profiles: [],
    };
  }
};

export const createProfile = async (profile) => {
  try {
    const response = await getData();
    let { success, profiles } = response;
    if (success) {
      const isProfileExist = profiles.some((p) => p.name === profile.name);
      if (!isProfileExist) {
        if (profile.default) {
          profiles = profiles.map((p) => ({
            ...p,
            default: false,
          }));
        }
        const newProfiles = [...profiles, profile];
        await saveData(newProfiles);
        return {
          success: true,
          profiles: newProfiles,
        };
      }
    }
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const updateProfile = async (profile) => {
  try {
    const response = await getData();
    let { success, profiles } = response;
    if (success) {
      if (profile.default) {
        profiles = profiles.reduce((acc, curr) => {
          if (curr.name !== profile.name) {
            acc.push({
              ...curr,
              default: false,
            });
          }
          return acc;
        }, []);
      } else {
        profiles = profiles.filter((p) => p.name !== profile.name);
      }
      const newProfiles = [...profiles, profile];
      await saveData(newProfiles);
      return {
        success: true,
        profiles: newProfiles,
      };
    }
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const deleteProfile = async (profile) => {
  try {
    const response = await getData();
    const { success, profiles } = response;
    if (success) {
      const newProfiles = profiles.filter((p) => p.name !== profile.name);
      await saveData(newProfiles);
      return {
        success: true,
        profiles: newProfiles,
      };
    }
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};
