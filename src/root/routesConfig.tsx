import React from "react";
import { HOME, SIGNIN, SIGNUP } from "./routeConstants";
import Home from "modules/Home";
import SignIn from "modules/Auth/signIn";
import SignUp from "modules/Auth/signUp";

const routesConfig = [
  {
    path: HOME,
    includeHeader: false,
    element: <Home />,
    isProtected: false,
    key: "home",
  },
  {
    path: SIGNIN,
    includeHeader: false,
    element: <SignIn />,
    isProtected: false,
    key: "signIn",
  },
  {
    path: SIGNUP,
    includeHeader: false,
    element: <SignUp />,
    isProtected: false,
    key: "signUp",
  },
];

export default routesConfig;
