import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  getAllCertificates,
  getDownloadCertificate,
  getExpiredCertificates,
  getNearExpiryCertificates,
  postAddCertificate,
  postCreateCertificate,
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

export const useCreateCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation(postCreateCertificate, {
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries(["allCertificates"]);
      queryClient.invalidateQueries(["expiredCertificates"]);
      queryClient.invalidateQueries(["nearExpiryCertificates"]);
    },
  });
};

export const useAddCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation(postAddCertificate, {
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries(["allCertificates"]);
      queryClient.invalidateQueries(["expiredCertificates"]);
      queryClient.invalidateQueries(["nearExpiryCertificates"]);
    },
  });
};

export const useDownloadCertificate = () => {
  return useMutation(getDownloadCertificate, {
    onSuccess: (res: any) => {
      const url = window.URL.createObjectURL(new Blob([res.file]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", res.file_name);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    },
  });
};
