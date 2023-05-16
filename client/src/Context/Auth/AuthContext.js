import React from "react";
const AuthContext = React.createContext({
  isUser: false,
  User: null,
  AccessToken: null,
  LogIn: (User, AccessToken) => {},
  LogOut: () => {},
  UpdateToken: (AccessToken) => {},
  UpdateUser: (User) => {},
});
export default AuthContext;
