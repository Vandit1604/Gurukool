import React, { useEffect, useReducer } from "react";
import AuthContext from "./AuthContext";
const defaultState = {
  isUser: localStorage.getItem("isUser") || "false",
  User: JSON.parse(localStorage.getItem("User")) || null,
  AccessToken: localStorage.getItem("AccessToken") || null,
};
const HandelAction = (state, action) => {
  if (action.type === "LogIn") {
    return {
      isUser: true,
      User: action.User,
      AccessToken: action.AccessToken,
    };
  } else if (action.type === "LogOut") {
    return {
      isUser: "false",
      User: null,
      AccessToken: null,
    };
  } else if (action.type === "AccessToken") {
    return {
      isUser: state.isUser,
      User: state.User,
      AccessToken: action.AccessToken,
    };
  } else if (action.type === "Update") {
    return {
      isUser: state.isUser,
      User: action.User,
      AccessToken: state.AccessToken,
    };
  }
  return defaultState;
};
function AuthProvider(props) {
  const [state, dispatch] = useReducer(HandelAction, defaultState);
  useEffect(() => {
    localStorage.clear();
    localStorage.setItem("isUser", state.isUser);
    localStorage.setItem("User", JSON.stringify(state.User));
    localStorage.setItem("AccessToken", state.AccessToken);
  }, [state]);
  const LogIn = (User, AccessToken) => {
    dispatch({
      type: "LogIn",
      User: User,
      AccessToken: AccessToken,
    });
  };
  const LogOut = () => {
    dispatch({
      type: "LogOut",
    });
  };
  const UpdateToken = (AccessToken) => {
    dispatch({
      type: "AccessToken",
      AccessToken: AccessToken,
    });
  };
  const UpdateUser = (User) => {
    dispatch({
      type: "Update",
      User: User,
    });
  };
  const StateValue = {
    isUser: state.isUser,
    User: state.User,
    AccessToken: state.AccessToken,
    LogIn: LogIn,
    LogOut: LogOut,
    UpdateToken: UpdateToken,
    UpdateUser: UpdateUser,
  };
  return (
    <AuthContext.Provider value={StateValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
