/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode, createContext, useCallback, useContext } from "react";
import { dataSociosTable } from "../Interfaces/Socios/socios.interface";
import useApi from "../api/Socios/socio.api";
import { getSocios } from "../api/Socios/socio.service";

interface sociosContextType {
  reloadRecords: () => void;
  socios: dataSociosTable[] | null;
  loading: boolean;
  error: string | null;
  //   fetchSocios: () => void;
}
const SociosContext = createContext<sociosContextType | undefined>(undefined);
interface sociosProviderProps {
  children: ReactNode;
}
export function SociosProvider({ children }: sociosProviderProps) {
  const {
    data: socios,
    loading,
    error,
    refetch,
  } = useApi<dataSociosTable[]>(getSocios);
  const reloadRecords = useCallback(async () => {
    console.log("Relaoding...");
    await refetch();
  }, [refetch]);
  return (
    <SociosContext.Provider value={{ socios, reloadRecords, loading, error }}>
      {children}
    </SociosContext.Provider>
  );
}
export const UseSocios=(): sociosContextType =>{
  const context = useContext(SociosContext);
  if (!context) {
    throw new Error("UseSocios debe usarse dentro de un SociosProvider");
  }
  return context;
}
