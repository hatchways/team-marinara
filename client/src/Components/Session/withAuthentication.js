/*
 * Higher order component which makes token and user object available
 * to all components in Context. Components can also update token and
 * userId via setToken() and setUserId() methods
 */

import React, { useEffect, useState } from "react";
import { getUser } from "Utils/api";

import AuthUserContext from "./AuthUserContext";
import axios from "axios";
import connect from "Utils/socket";

const withAuthentication = Component => {
  const WithAuthentication = props => {
    const prevToken = window.localStorage.getItem("token") || null;

    const [token, setToken] = useState(prevToken);
    const [user, setUser] = useState(null);
    const [socket, setSocket] = useState(null);

    // When token changes via setToken, save to local storage and
    // fetch the user and put in context
    useEffect(() => {
      const getCurrentUser = async () => {
        if (token) {
          window.localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = token;
          const loggedInUser = await getUser();
          setUser(loggedInUser);
          setSocket(connect(loggedInUser.id));
        }
      };
      getCurrentUser();
    }, [token]);

    const logOut = () => {
      window.localStorage.removeItem("token");
      axios.defaults.headers.common["Authorization"] = null;
      setUser(null);
      setToken(null);
    };

    const defaultContext = {
      token,
      setToken,
      user,
      logOut,
      socket
    };

    return (
      <AuthUserContext.Provider value={defaultContext}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  };
  return WithAuthentication;
};

export default withAuthentication;
