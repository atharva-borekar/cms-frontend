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

  getDownloadCertificate: (userId: string, certificateId: string) =>
    `/users/${userId}/download_certificate/${certificateId}`,
  postRenewCertificate: (userId: string, certificateId: string) =>
    `/users/${userId}/renew_certificate/${certificateId}`,
  GENERATE_CSR: "/generate_csr",

  postDownloadPrivateKey: (userId: string, certificateId: string | number) =>
    `/users/${userId}/download_private_key/${certificateId}`,
};
