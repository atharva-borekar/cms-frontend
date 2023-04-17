import React from "react";
import { Navigate } from "react-router-dom";

import withLayout from "HOC/withLayout";
import { LOGIN_PATH } from "api/constants";
import { getLocalStorageData } from "utils/loalStorageUtils";

interface IRoute {
  route: {
    element: React.ReactNode;
    includeHeader: boolean;
    path: string;
  };
}

const PrivateRoute: React.FC<IRoute> = ({ route }) => {
  const authToken = getLocalStorageData("auth_token");

  const finalComponent = withLayout(route.element, route.includeHeader);
  return authToken ? (
    finalComponent
  ) : (
    <Navigate to={LOGIN_PATH} replace={true} />
  );
};

export default PrivateRoute;
