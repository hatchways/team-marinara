/*
 * Higher Order Component which restricts components to logged in users only
 */

import React, { useContext, useEffect } from "react";
import AuthUserContext from "Components/Session/AuthUserContext";

const requireAuth = Component => {
  const WithAuthorization = props => {
    const context = useContext(AuthUserContext);

    useEffect(() => {
      // If user is not logged in, send back to login page
      if (!context.userId) props.history.push("/login");
    }, [context.userId, props.history]);

    return context.user ? <Component {...props} /> : null;
  };

  return WithAuthorization;
};
export default requireAuth;
