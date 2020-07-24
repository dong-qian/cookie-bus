import React from 'react';

const actionType = {
  SET_COOKIES: 'SET_COOKIES'
};

const initialState = {
  cookies: {}
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_COOKIES:
      return {
        ...state,
        cookies: action.payload
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const CookieContext = React.createContext();

export const CookieProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <CookieContext.Provider
      value={{
        cState: state,
        cDispatch: dispatch,
        cActionType: actionType
      }}
    >
      {children}
    </CookieContext.Provider>
  );
};

export const useCookieStore = () => {
  const context = React.useContext(CookieContext);
  if (context === undefined) {
    throw new Error('useCookieStore must be used within a CookieProvider');
  }
  return context;
};
