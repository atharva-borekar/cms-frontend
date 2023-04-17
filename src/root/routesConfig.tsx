import { HOME, SIGNIN, SIGNUP } from "./routeConstants";
import Home from "modules/Home";
import SignIn from "modules/Auth/SignIn";
import SignUp from "modules/Auth/SignUp";
import withLayout from "HOC/withLayout";

const routesConfig = [
  {
    path: HOME,
    includeHeader: true,
    element: <Home />,
    isProtected: true,
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
