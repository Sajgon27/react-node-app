import React, { useState } from "react";
import { useCookies } from "react-cookie";

const AuthContext = React.createContext({
  isLoggedIn: false,
  cook: {},
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, setCookie] = useCookies();
  const [name, setName] = useState();
  function loginHandler(name) {
    setName(name);
    setIsLoggedIn(true);
  }
  function logoutHandler() {
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        cook: cookies,
        login: loginHandler,
        logout: logoutHandler,
        name: name,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
