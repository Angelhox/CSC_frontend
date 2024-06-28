import { isAxiosError } from "axios";
import {
  IContrato,
  dataContratosTable,
} from "../../Interfaces/Contratos/contratos.interface";
import axiosInstance from "../../libs/axios";
export async function getContratos(): Promise<dataContratosTable[]> {
  try {
    console.log("Trying to get Contratos");
    const response = await axiosInstance.get<dataContratosTable[]>(
      "/contratos"
    );
    console.log("Contratos data: ", response.data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to fetch contratos"
      );
    } else {
      console.log("Error: ", error);
      throw new Error("An unexpected error occurred");
    }
  }
}
export async function createContrato(contrato: IContrato) {
  try {
    const response = await axiosInstance.post<IContrato>(
      "/contratos",
      contrato
    );
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to create an contrato"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}
