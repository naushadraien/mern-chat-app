import { ConfigType } from "@/utils/requestAPI";

export const userMessagesConfig = {
  userMessage: (id: string): ConfigType => ({
    method: "get",
    url: `/message/${id}`,
    withCredentials: true,
  }),
  sendMessage: (id: string, data: { message: string }): ConfigType => ({
    method: "post",
    url: `/message/send/${id}`,
    data,
    withCredentials: true,
  }),
};
