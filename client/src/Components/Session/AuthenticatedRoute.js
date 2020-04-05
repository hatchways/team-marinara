import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthUserContext } from "Components/AuthUserContext";

const AuthenticatedRoute = ({ render, ...routeProps }) => {
  const { user } = true; //useContext(Context);
  return (
    <Route
      {...routeProps}
      render={() => (user ? render() : <Redirect to="/login" />)}
    />
  );
};

export default AuthenticatedRoute;
