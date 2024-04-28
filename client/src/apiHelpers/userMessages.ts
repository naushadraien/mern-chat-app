import { ConfigType } from "@/utils/requestAPI";

export const userMessagesConfig = {
  userMessage: (id: string): ConfigType => ({
    method: "get",
    url: `/message/${id}`,
    withCredentials: true,
  }),
};
