export const API_ROUTES = {
  SIGN_IN: "/users/signin",
  SIGN_UP: "/users/signup",

  getCertificates: (userId: string) => `/users/${userId}/get_certificates`,
};
