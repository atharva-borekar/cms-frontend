import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { postSignIn, postSignUp } from "services/auth.services";
import { setLocalStorageData } from "utils/loalStorageUtils";

export const useSignIn = () =>
  useMutation(postSignIn, {
    onSuccess: (res) => {
      toast.success("Logged In!");
      setLocalStorageData("auth_token", res.access_token);
      setLocalStorageData("user", res.user);
    },
    onError: (err) => {},
  });
export const useSignUp = () =>
  useMutation(postSignUp, {
    onSuccess: (res) => {
      toast.success(res.message);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });
