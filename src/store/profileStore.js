import React from 'react';

const actionType = {
  UPDATE_PROFILES: 'UPDATE_PROFILES',
  SET_CURRENT_PROFILE: 'SET_CURRENT_PROFILE',
  SET_EDIT_PROFILE: 'SET_EDIT_PROFILE'
};

const initialState = {
  savedProfiles: [],
  currentProfile: null,
  editProfile: null,
  currentCookies: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.UPDATE_PROFILES:
      if (!state.currentProfile) {
        return {
          ...state,
          currentProfile: action.payload[0],
          savedProfiles: action.payload
        };
      }
      return {
        ...state,
        savedProfiles: action.payload
      };
    case actionType.SET_CURRENT_PROFILE:
      return {
        ...state,
        currentProfile: action.payload
      };
    case actionType.SET_EDIT_PROFILE:
      return {
        ...state,
        editProfile: action.payload
      };
    case actionType.SET_CURRENT_COOKIES:
      return {
        ...state,
        currentCookies: action.payload
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const ProfileContext = React.createContext();

export const ProfileProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <ProfileContext.Provider
      value={{
        pState: state,
        pDispatch: dispatch,
        pActionType: actionType
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileStore = () => {
  const context = React.useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfileState must be used within a ProfileProvider');
  }
  return context;
};
