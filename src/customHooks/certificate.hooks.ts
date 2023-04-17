import { useQuery } from "@tanstack/react-query";
import {
  getAllCertificates,
  getExpiredCertificates,
  getNearExpiryCertificates,
} from "services/certificate.services";

export const useAllCertificates = (userId: string) =>
  useQuery(["allCertificates", userId], () => getAllCertificates(userId), {
    select: (res: any) => res?.data,
  });

export const useExpiredCertificates = (userId: string) =>
  useQuery(
    ["expiredCertificates", userId],
    () => getExpiredCertificates(userId),
    {
      select: (res: any) => res?.data,
    }
  );

export const useNearExpiryCertificates = (userId: string) =>
  useQuery(
    ["nearExpiryCertificates", userId],
    () => getNearExpiryCertificates(userId),
    {
      select: (res: any) => res?.data,
    }
  );
