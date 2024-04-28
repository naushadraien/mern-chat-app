import { ConfigType } from "@/utils/requestAPI";

export type LoginDataType = Pick<RegisterDataType, "userName" | "password">;

export type RegisterDataType = {
  fullName: string;
  userName: string;
  password: string;
  confirmPassword: string;
  gender: "male" | "female" | "";
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
  login: (data: LoginDataType): ConfigType => ({
    method: "post",
    data,
    url: "/auth/login",
  }),
  register: (data: RegisterDataType): ConfigType => ({
    method: "post",
    data,
    url: "/auth/register",
  }),
};

export default authConfig;
