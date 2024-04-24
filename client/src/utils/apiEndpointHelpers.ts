import chatConfig from "@/config";

const API = chatConfig.BACKEND_URL;
export const getApi = () => {
  return API || "";
};
