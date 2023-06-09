import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  getAllCertificates,
  getDownloadCertificate,
  getExpiredCertificates,
  getNearExpiryCertificates,
  postAddCertificate,
  postCreateCertificate,
  postDownloadPrivateKey,
  postGenerateCsr,
  postRenewCertificate,
  postSignCsr,
} from "services/certificate.services";

export const useAllCertificates = (userId: string) =>
  useQuery(["allCertificates", userId], () => getAllCertificates(userId), {
    select: (res: any) => res,
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

export const useGenerateCsr = () => {
  const queryClient = useQueryClient();
  return useMutation(postGenerateCsr, {
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

export const useRenewCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation(postRenewCertificate, {
    onSuccess: (res: any) => {
      toast.success(res.message);
      queryClient.invalidateQueries(["allCertificates"]);
      queryClient.invalidateQueries(["expiredCertificates"]);
      queryClient.invalidateQueries(["nearExpiryCertificates"]);
    },
  });
};

export const useDownloadPrivateKey = () => {
  return useMutation(postDownloadPrivateKey, {
    onSuccess: (res: any) => {
      const url = window.URL.createObjectURL(new Blob([res?.file]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", res?.file_name ?? "download.pem");
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    },
  });
};

export const useSignCsr = () => {
  const queryClient = useQueryClient();
  return useMutation(postSignCsr, {
    onSuccess: (res: any) => {
      toast.success(res.message);
      queryClient.invalidateQueries(["allCertificates"]);
      queryClient.invalidateQueries(["expiredCertificates"]);
      queryClient.invalidateQueries(["nearExpiryCertificates"]);
    },
  });
};
