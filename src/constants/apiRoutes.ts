export const API_ROUTES = {
  SIGN_IN: "/users/signin",
  SIGN_UP: "/users/signup",

  getCertificates: (userId: string) => `/users/${userId}/get_certificates`,
  getExpiredCertificates: (userId: string) =>
    `/users/${userId}/get_expired_certificates`,
  getNearExpiryCertificates: (userId: string) =>
    `/users/${userId}/get_near_expiry_certificates`,

  createCertificate: (userId: string) => `/users/${userId}/create_certificate`,
  addCertificate: (userId: string) => `/users/${userId}/add_certificate`,
};
