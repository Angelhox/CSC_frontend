import { isAxiosError } from "axios";
import { dataRoles } from "../../Interfaces/Roles/roles.interface";
import axiosInstance from "../../libs/axios";

export async function getRoles(): Promise<dataRoles[]> {
  try {
    const response = await axiosInstance.get<dataRoles[]>("/rol");
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch cargos"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}
