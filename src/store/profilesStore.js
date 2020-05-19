import React from "react";
import * as storage from "../api/storage";

const actionType = {
  UPDATE_PROFILES: "UPDATE_PROFILES",
  SET_CURRENT_PROFILE: "SET_CURRENT_PROFILE",
  SET_CREATION_MODE: "SET_CREATION_MODE",
  SET_SELECTION_MODE: "SET_SELECTION_MODE",
  SET_EDIT_MODE: "SET_EDIT_MODE",
  SET_TOAST: "SET_TOAST",
};

const initialState = {
  savedProfiles: [],
  currentProfile: null,
  editProfile: null,
  selectionMode: false,
  creatationMode: false,
  editMode: true,
  toast: null,
};

const offMode = {
  selectionMode: false,
  creatationMode: false,
  editMode: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.UPDATE_PROFILES:
      if (!state.currentProfile) {
        return {
          ...state,
          ...offMode,
          currentProfile: action.payload[0],
          savedProfiles: action.payload,
        };
      }
      return {
        ...state,
        ...offMode,
        savedProfiles: action.payload,
      };
    case actionType.SET_CURRENT_PROFILE:
      return {
        ...state,
        ...offMode,
        currentProfile: action.payload,
      };
    case actionType.SET_CREATION_MODE:
      return {
        ...state,
        ...offMode,
        creatationMode: action.payload,
      };
    case actionType.SET_SELECTION_MODE:
      return {
        ...state,
        ...offMode,
        selectionMode: action.payload,
      };
    case actionType.SET_EDIT_MODE:
      return {
        ...state,
        ...offMode,
        editMode: action.payload,
      };
    case actionType.SET_EDIT_PROFILE:
      return {
        ...state,
        editProfile: action.payload,
      };
    case actionType.SET_TOAST:
      return {
        ...state,
        toast: action.payload,
      };
    default:
      throw new Error("Something wrong");
  }
};

const useProfileStore = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    const fetchProfiles = async () => {
      const response = await storage.getData();
      const { success, profiles } = response;
      if (success && profiles.length > 0) {
        let defaultProfile = profiles.find((p) => p.default === true);
        if (!defaultProfile) {
          defaultProfile = profiles[0];
        }
        dispatch({
          type: actionType.SET_CURRENT_PROFILE,
          payload: defaultProfile,
        });
        dispatch({ type: actionType.UPDATE_PROFILES, payload: profiles });
      }
    };
    fetchProfiles();
  }, []);

  return {
    state,
    dispatch,
    actionType,
  };
};

export default useProfileStore;
