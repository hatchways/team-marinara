import React, { useEffect, useState } from "react";
import { getUser } from "Utils/api";

const AuthUserContext = React.createContext();

const withAuthentication = Component => {
  const WithAuthentication = props => {
    const prevToken = window.localStorage.getItem("token") || null;
    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlODYwOGMwYTQ2OWJjY2FmMWYwZTcxOCIsImlhdCI6MTU4NjA2NzA5Mn0.tdG03dsqQ9aNNxnhRCmNvxpf5c8LHsS559JZcu4SRZ4";
    const prevUserId = window.localStorage.getItem("userId") || null; // "5e8608c0a469bccaf1f0e718";

    const [token, setToken] = useState(prevToken);
    const [userId, setUserId] = useState(prevUserId);
    const [user, setUser] = useState({});

    // When token or userId changes via setToken or setUserId,
    // save to local storage, fetch the user and put in context
    useEffect(() => {
      const getCurrentUser = async () => {
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("userId", userId);

        const loggedInUser = await getUser(userId, token);
        setUser(loggedInUser);
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

export { withAuthentication, AuthUserContext };
