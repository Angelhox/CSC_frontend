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
export async function createServicio(servicio: IServicios) {
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
export async function updateServicio(
  servicio: IServicios,
  servicioId: string | number
) {
  try {
    const response = await axiosInstance.patch<IServicios>(
      `/servicios/${servicioId}`,
      servicio
    );
    return response.data;
  } catch (error) {
    console.log("Error updating servicio: ", error);
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to update an servicio"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}
export async function deleteServicio(
  servicioId: string | number
): Promise<IServicios> {
  try {
    console.log("Trying to delete socio: " + servicioId);
    const response = await axiosInstance.delete(`/servicios/${servicioId}`);
    return response.data;
  } catch (error) {
    console.log("Error deleting servicio: ", error);
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to delete servicio"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}
