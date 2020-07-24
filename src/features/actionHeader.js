import React from 'react';
import { ActionBar } from '../components';
import { useFeatureStore, useProfileStore, useCookieStore } from '../store';
import * as chromeApi from '../api/chrome';
import Cookies from 'js-cookie';

const DeleteIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
    <path
      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
      clipRule="evenodd"
      fillRule="evenodd"
    ></path>
  </svg>
);

const ListIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
    <path
      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
      clipRule="evenodd"
      fillRule="evenodd"
    ></path>
  </svg>
);

const ProfilesIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
  </svg>
);

const AddProfileIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
    <path
      d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z"
      clipRule="evenodd"
      fillRule="evenodd"
    ></path>
  </svg>
);

const ImportCookieIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
  </svg>
);

export const ActionHeader = () => {
  const { fState, fDispatch, fActionType } = useFeatureStore();
  const { pDispatch, pActionType } = useProfileStore();
  const { cDispatch, cActionType } = useCookieStore();

  const handleDeleteAllCookies = async () => {
    try {
      const activeTab = await chromeApi.getActiveTab();
      const activeStore = await chromeApi.getStoreByTab(activeTab);
      const cookies = await chromeApi.getAllCookiesByStore(
        activeTab.url,
        activeStore.id
      );
      for (const cookie of cookies) {
        await chromeApi.removeCookie(activeTab, activeStore, cookie);
      }

      pDispatch({ type: pActionType.SET_CURRENT_COOKIES, payload: [] });
      fDispatch({
        type: fActionType.SHOW_COMPLETION,
        payload: { show: true, message: 'Cookies are deleted' }
      });
      setTimeout(
        () =>
          fDispatch({
            type: fActionType.SHOW_COMPLETION,
            payload: { show: false, message: '' }
          }),
        500
      );
    } catch (err) {
      fDispatch({
        type: fActionType.SHOW_ERROR,
        payload: { show: true, message: err }
      });
    }
  };

  const handleShowAllCookies = () => {
    try {
      const cookies = Cookies.get();
      cDispatch({
        type: cActionType.SET_COOKIES,
        payload: Object.keys(cookies).map((key) => ({
          name: key,
          value: cookies[key]
        }))
      });
      fDispatch({ type: fActionType.SHOW_COOKIE_LIST });
    } catch (err) {
      fDispatch({
        type: fActionType.SHOW_ERROR,
        payload: { show: true, message: err }
      });
    }
  };

  const actions = [
    {
      name: 'Import cookie',
      Icon: ImportCookieIcon,
      desc: 'Import cookie',
      action: () => fDispatch({ type: fActionType.IMPORT_COOKIE }),
      active: fState.currentFeature === fActionType.IMPORT_COOKIE
    },
    {
      name: 'Create profile',
      Icon: AddProfileIcon,
      desc: 'Create profile',
      action: () => fDispatch({ type: fActionType.CREATE_PROFILE }),
      active: fState.currentFeature === fActionType.CREATE_PROFILE
    },
    {
      name: 'Change Profile',
      Icon: ProfilesIcon,
      desc: 'Change profile',
      action: () => fDispatch({ type: fActionType.CHANGE_PROFILE }),
      active: fState.currentFeature === fActionType.CHANGE_PROFILE
    },
    {
      name: 'Show of cookies',
      Icon: ListIcon,
      desc: 'Show all cookies',
      action: async () => await handleShowAllCookies(),
      active: fState.currentFeature === fActionType.SHOW_COOKIE_LIST
    },
    {
      name: 'Delete all cookies',
      Icon: DeleteIcon,
      desc: 'Delete all cookies',
      action: async () => await handleDeleteAllCookies(),
      active: false
    }
  ];

  return <ActionBar actions={actions} />;
};
