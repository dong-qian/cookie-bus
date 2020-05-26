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

export const getAllCookiesByTab = (activeTab, ActiveStore) => {
  return new Promise((resolve, reject) => {
    chrome.cookies.getAll(
      { url: activeTab.url, storeId: ActiveStore.id },
      (cookies) => {
        if (!cookies)
          return reject(`No cookies or ${activeTab.url} is invaild url`);
        resolve(cookies);
      }
    );
  });
};

export const getActiveTab = () => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      resolve(tabs[0]);
    });
  });
};

export const setCookie = (cookie, activeTab, activeStore) => {
  return new Promise((resolve, reject) => {
    chrome.cookies.set({
      url: activeTab.url,
      storeId: activeStore.id,
      path: '/',
      name: cookie.name,
      value: cookie.value
    });
    resolve();
  });
};

export const getStoreByTab = (tab) => {
  return new Promise((resolve, reject) => {
    chrome.cookies.getAllCookieStores((cookieStores) => {
      const store = cookieStores.find((store) => store.tabIds.includes(tab.id));
      resolve(store);
    });
  });
};

export const removeCookie = (activeTab, activeStore, cookie) => {
  return new Promise((resolve, reject) => {
    chrome.cookies.remove({
      url: activeTab.url,
      storeId: activeStore.id,
      name: cookie.name
    });
    resolve();
  });
};
