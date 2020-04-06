/*
 * Higher order component which makes token and user object available
 * to all components in Context. Components can also update token and
 * userId via setToken() and setUserId() methods
 */

import React, { useEffect, useState } from "react";
import { getUser } from "Utils/api";

import AuthUserContext from "./AuthUserContext";

const withAuthentication = Component => {
  const WithAuthentication = props => {
    const prevToken = window.localStorage.getItem("token") || null;
    const prevUserId = window.localStorage.getItem("userId") || null;

    const [token, setToken] = useState(prevToken);
    const [userId, setUserId] = useState(prevUserId);
    const [user, setUser] = useState(null);

    // When token or userId changes via setToken or setUserId,
    // save to local storage, fetch the user and put in context,
    // or delete if logged out
    useEffect(() => {
      const getCurrentUser = async () => {
        if (token) {
          window.localStorage.setItem("token", token);
        } else {
          window.localStorage.removeItem("token");
        }

        if (userId) {
          window.localStorage.setItem("userId", userId);
          const loggedInUser = await getUser(userId, token);
          setUser(loggedInUser);
        } else {
          window.localStorage.removeItem("userId");
        }
      };
      getCurrentUser();
    }, [token, userId]);

    const defaultContext = {
      token,
      setToken,
      userId,
      setUserId,
      user
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
