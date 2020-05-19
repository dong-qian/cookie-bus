/*global chrome*/

export const getAllCookies = (curerentProfile) => {
  return new Promise((resolve, reject) => {
    chrome.cookies.getAll({ url: curerentProfile.url }, (cookies) => {
      if (!cookies)
        return reject(`No cookies or ${curerentProfile.url} is invaild url`);
      resolve(cookies);
    });
  });
};

export const getActiveTab = () => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      resolve(tabs[0]);
    });
  });
};

export const setCookie = (cookie, activeTab) => {
  return new Promise((resolve, reject) => {
    chrome.cookies.set({
      url: activeTab.url,
      path: "/",
      name: cookie.name,
      value: cookie.value,
    });
    resolve();
  });
};
