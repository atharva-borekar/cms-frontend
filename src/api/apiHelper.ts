import axios from "axios";
import { toast } from "react-toastify";

import { getLocalStorageData } from "../utils/loalStorageUtils";
import {
  BASE_URL,
  DELETE_METHOD,
  GET_METHOD,
  POST_METHOD,
  PUT_METHOD,
  PATCH_METHOD,
} from "./constants";
import { LOCAL_STORAGE_KEYS } from "../constants/index";

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json; version=1",
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: defaultHeaders,
});
const mockAxiosInstance = axios.create({
  baseURL: "http://localhost:3000/mock/",
});
export const mockGetApi = async (route: string, params?: any) => {
  const response = await mockAxiosInstance.request({
    url: `${route}.json`,
    method: GET_METHOD,
    params: params,
  });
  return response.data;
};

export const mockPostApi = (route: string, payload: any) =>
  mockAxiosInstance.post(route, payload);

//GET Method
export async function getApi<ParamsT, ResponseT>(
  reqPath: string,
  payload?: ParamsT
): Promise<ResponseT> {
  const response = await axiosInstance.request({
    url: reqPath,
    method: GET_METHOD,
    params: payload,
    headers: {
      ...defaultHeaders,
    },
  });
  return response.data;
}

//POST Method
export const postApi = async (reqPath: string, payload: object = {}) => {
  const response = await axiosInstance.request({
    url: reqPath,
    method: POST_METHOD,
    data: payload,
    headers: {
      ...defaultHeaders,
    },
  });
  return response.data;
};

//PUT Method
export const putApi = async (reqPath: string, payload: object = {}) => {
  const response = await axiosInstance.request({
    url: reqPath,
    method: PUT_METHOD,
    data: payload,
    headers: {
      ...defaultHeaders,
    },
  });
  return response.data;
};

//PATCH Method
export const patchApi = async (reqPath: string, payload: object = {}) => {
  const response = await axiosInstance.request({
    url: reqPath,
    method: PATCH_METHOD,
    data: payload,
    headers: {
      ...defaultHeaders,
    },
  });
  return response.data;
};

//DELETE Method
export const deleteApi = async (reqPath: string, payload: object = {}) => {
  const response = await axiosInstance.request({
    url: reqPath,
    method: DELETE_METHOD,
    data: payload,
    headers: {
      ...defaultHeaders,
    },
  });
  return response.data;
};

// adding the default query params required for all API's
axiosInstance.interceptors.request.use((config: any) => {
  const userInfo = getLocalStorageData(LOCAL_STORAGE_KEYS.USER_DETAILS);
  config.headers = {
    ...config.headers,
    Authorization: userInfo?.auth_token,
  };
  return config;
});

//interceptor for showing toast notifications on global level
axiosInstance.interceptors.response.use(
  (res) => {
    toast.success(res?.data?.msg);
    return res;
  },
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.clear();
    }
    toast.error(
      `${error?.response?.data?.errors}` || "Oops, something went wrong!"
    );
    return Promise.reject(error);
  }
);
