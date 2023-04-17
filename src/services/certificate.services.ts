import { getApi } from "api/apiHelper";
import { API_ROUTES } from "constants/apiRoutes";

export const getAllCertificates = (userId: string) =>
  getApi(API_ROUTES.getCertificates(userId));
