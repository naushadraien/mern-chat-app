import axios from "axios";
import { toast } from "react-hot-toast";
import { getApi } from "./apiEndpointHelpers";

export type ParamsType = {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  filter?: string;
  query?: string;
  [key: string]: any;
};

export type MethodType =
  | "get"
  | "post"
  | "delete"
  | "patch"
  | "put"
  | "head"
  | "options";

export type ConfigType = {
  url: string;
  method: MethodType;
  data?: any;
  params?: ParamsType;
  withCredentials?: boolean;
};

let isNetworkError = false;
const requestAPI = async (config: ConfigType, isDebug = false) => {
  const API_URL = getApi();
  try {
    const res = await axios({
      ...config,
      url: API_URL + config.url,
    });
    if (res.status >= 200 && res.status < 300) {
      const data = res?.data || res?.data?.data || res;
      if (res?.data.status === "error") {
        throw res?.data;
      } else {
        isNetworkError = false;
        return data;
      }
    }
  } catch (error: any) {
    if (error.code === "ERR_NETWORK" && !isNetworkError) {
      isNetworkError = true;
      toast.error(error.message, {
        // theme: "colored",
        // hideProgressBar: true,
        // autoClose: 3000,
      });
      return;
    }

    if (isDebug) {
      console.error(error.response?.data || error);
    }
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      throw error.response.data.message;
    }
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.error
    ) {
      throw error.response.data.error;
    }
    throw error.message || JSON.stringify(error);
  }
};

export default requestAPI;
