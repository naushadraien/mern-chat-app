import { ConfigType } from "@/utils/requestAPI";

export type LoginDataType = {
  userName: string;
  password: string;
};
// export const login = async (data: LoginDataType) => {
//   try {
//     const response = await axios.post(
//       `${chatConfig.BACKEND_URL}/auth/login`,
//       data,
//       {
//         withCredentials: true,
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

const authConfig = {
  login: (data: any): ConfigType => ({
    method: "post",
    data,
    url: "/auth/login",
  }),
};

export default authConfig;
