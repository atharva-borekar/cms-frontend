import { useQuery } from "@tanstack/react-query";
import { getAllCertificates } from "services/certificate.services";

export const useGetAllCertificates = (userId: string) =>
  useQuery(["allCertificates"], () => getAllCertificates(userId), {
    select: (res: any) => res?.data,
  });
