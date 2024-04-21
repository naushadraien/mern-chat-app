import chatConfig from "@/config";
import axios from "axios";

export const login = async (data: any) => {
  try {
    const response = await axios.post(
      `${chatConfig.BACKEND_URL}/auth/login`,
      data,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
