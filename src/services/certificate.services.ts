import { getApi, postApi } from "api/apiHelper";
import { API_ROUTES } from "constants/apiRoutes";

interface IPostCreateCertificatePayload {
  certificate: {
    name: string;
    country: string;
    state: string;
    email: string;
    common_name: string;
    organization_unit: string;
    organization_name: string;
    locality: string;
  };
}
interface IPostAddCertificatePayload {
  certificate: string;
}

export const getAllCertificates = (userId: string) =>
  getApi(API_ROUTES.getCertificates(userId));

export const getExpiredCertificates = (userId: string) =>
  getApi(API_ROUTES.getExpiredCertificates(userId));

export const getNearExpiryCertificates = (userId: string) =>
  getApi(API_ROUTES.getNearExpiryCertificates(userId));

export const postCreateCertificate = ({
  userId,
  postCreateCertificatePayload,
}: {
  userId: string;
  postCreateCertificatePayload: IPostCreateCertificatePayload;
}) =>
  postApi(API_ROUTES.createCertificate(userId), postCreateCertificatePayload);

export const postAddCertificate = ({
  userId,
  postAddCertificatePayload,
}: {
  userId: string;
  postAddCertificatePayload: IPostAddCertificatePayload;
}) => postApi(API_ROUTES.addCertificate(userId), postAddCertificatePayload);

export const getDownloadCertificate = ({
  userId,
  certificateId,
}: {
  userId: string;
  certificateId: string;
}) =>
  getApi(API_ROUTES.getDownloadCertificate(userId, certificateId), undefined, {
    Accept: "application/x-pem-file",
  });

export const postRenewCertificate = ({
  userId,
  certificateId,
}: {
  userId: string;
  certificateId: string;
}) =>
  postApi(API_ROUTES.postRenewCertificate(userId, certificateId), undefined);
