import {
  ISocio,
  dataSociosTable,
} from "../../Interfaces/Socios/socios.interface";
import axiosInstance from "../../libs/axios";
import { isAxiosError } from "axios";

export async function getSocios(): Promise<dataSociosTable[]> {
  try {
    const response = await axiosInstance.get<dataSociosTable[]>("/socios");
    console.log("Data: ", response.data);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch usuarios"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}
export async function createSocio(socio: ISocio): Promise<ISocio> {
  try {
    console.log("Trying to create socio: ", socio);
    const response = await axiosInstance.post<ISocio>("/socios", socio);
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Failed to create socio");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}
