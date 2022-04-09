import * as React from "react";
import { Navigate } from "react-router-dom";
import { PrivateRouteProps } from "./types";

const PrivateRoute = ({ isAuthenticated, outlet }: PrivateRouteProps) => {
  return isAuthenticated ? outlet : <Navigate to="/" />;
};

export default PrivateRoute;
