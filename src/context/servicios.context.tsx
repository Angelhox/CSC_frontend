/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode, createContext, useCallback, useContext } from "react";
import { dataServiciosTable } from "../Interfaces/Servicios/servicios.interface";
import { getServicios } from "../api/Servicios/servicio.service";
import useApi from "../api/commons/useApi";

interface serviciosContexType {
  reloadRecords: () => void;
  servicios: dataServiciosTable[] | null;
  loading: boolean;
  error: string | null;
}
const ServiciosContext = createContext<serviciosContexType | undefined>(
  undefined
);
interface serviciosProviderProps {
  children: ReactNode;
}
export function ServiciosProvider({ children }: serviciosProviderProps) {
  const {
    data: servicios,
    loading,
    error,
    refetch,
  } = useApi<dataServiciosTable[]>(getServicios);
  const reloadRecords = useCallback(() => {
    refetch();
  }, [refetch]);
  return (
    <ServiciosContext.Provider
      value={{ servicios, reloadRecords, loading, error }}
    >
      {children}
    </ServiciosContext.Provider>
  );
}
export const UseServiciosContext = (): serviciosContexType => {
  const context = useContext(ServiciosContext);
  if (!context) {
    throw new Error(
      "UseServiciosContext debe usarse dentro de un ServiciosProvider"
    );
  }
  return context;
};
