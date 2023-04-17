import { getApi } from "api/apiHelper";
import { API_ROUTES } from "constants/apiRoutes";

export const getAllCertificates = (userId: string) =>
  getApi(API_ROUTES.getCertificates(userId));

export const getExpiredCertificates = (userId: string) =>
  getApi(API_ROUTES.getExpiredCertificates(userId));

export const getNearExpiryCertificates = (userId: string) =>
  getApi(API_ROUTES.getNearExpiryCertificates(userId));
