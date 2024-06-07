import {
  IServicios,
  dataServiciosTable,
} from "../../Interfaces/Servicios/servicios.interface";
import axiosInstance from "../../libs/axios";
import { isAxiosError } from "axios";

export async function getServicios(): Promise<dataServiciosTable[]> {
  try {
    const response = await axiosInstance.get<dataServiciosTable[]>(
      "/servicios"
    );
    console.log("Data: ", response.data);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.log("Error: ", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch usuarios"
      );
    } else {
      console.log("Error: ", error);

      throw new Error("An unexpected error occurred");
    }
  }
}
export async function createServicio(
  servicio: IServicios
): Promise<IServicios> {
  try {
    const response = await axiosInstance.post<IServicios>(
      "/servicios",
      servicio
    );
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to create an servicio"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}
