import React from 'react';

const actionType = {
  IMPORT_COOKIE: 'IMPORT_COOKIE',
  CREATE_PROFILE: 'CREATE_PROFILE',
  CHANGE_PROFILE: 'CHANGE_PROFILE',
  EDIT_PROFILE: 'EDIT_PROFILE',
  SHOW_COOKIE_LIST: 'SHOW_COOKIE_LIST',
  SHOW_COMPLETION: 'SHOW_COMPLETION',
  SHOW_ERROR: 'SHOW_ERROR'
};

const initialState = {
  currentFeature: actionType.SHOW_COOKIE_LIST,
  completion: {
    show: false,
    message: ''
  },
  error: {
    show: false,
    message: ''
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.IMPORT_COOKIE:
    case actionType.CREATE_PROFILE:
    case actionType.CHANGE_PROFILE:
    case actionType.EDIT_PROFILE:
    case actionType.SHOW_COOKIE_LIST:
      return {
        ...state,
        currentFeature: action.type,
        error: { show: false, message: '' }
      };
    case actionType.SHOW_COMPLETION:
      return {
        ...state,
        completion: action.payload,
        error: { show: false, message: '' }
      };
    case actionType.SHOW_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const FeatureContext = React.createContext();

export const FeatureProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <FeatureContext.Provider
      value={{
        fState: state,
        fDispatch: dispatch,
        fActionType: actionType
      }}
    >
      {children}
    </FeatureContext.Provider>
  );
};

export const useFeatureStore = () => {
  const context = React.useContext(FeatureContext);
  if (context === undefined) {
    throw new Error('useProfileState must be used within a ProfileProvider');
  }
  return context;
};
