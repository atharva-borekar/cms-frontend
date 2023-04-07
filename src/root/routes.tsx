import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { HOME } from "./routeConstants";
import { IRoutes } from "types/globalTypes";
import routesConfig from "./routesConfig";
import PrivateRoute from "./privateRoutes";

const RoutesComponent: React.FC = () => {
  const getRoutes = () =>
    routesConfig.map((route: IRoutes) =>
      route.isProtected ? (
        <>
          <Route
            path={route.path}
            key={route.key}
            element={<PrivateRoute route={route} />}
          />
          <Route path="*" key="dashboard" element={<Navigate to={HOME} />} />
        </>
      ) : (
        <Route key={route.key} path={route.path} element={route.element} />
      )
    );
  return (
    <BrowserRouter>
      <Routes>{getRoutes()}</Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
