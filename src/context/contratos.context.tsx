import { ReactNode, createContext, useCallback, useContext } from "react";
import { dataContratosTable } from "../Interfaces/Contratos/contratos.interface";
import useApi from "../api/commons/useApi";
import { getContratos } from "../api/Contratos/contratos.service";

interface contratosContextType {
  reloadRecords: () => void;
  contratos: dataContratosTable[] | null;
  loading: boolean;
  error: string | null;
}
const ContratosContext = createContext<contratosContextType | undefined>(
  undefined
);
interface contratosProviderProps {
  children: ReactNode;
}
export function ContratosProvider({ children }: contratosProviderProps) {
  const {
    data: contratos,
    loading,
    error,
    refetch,
  } = useApi<dataContratosTable[]>(getContratos);
  const reloadRecords = useCallback(() => {
    refetch();
  }, [refetch]);
  return (
    <ContratosContext.Provider
      value={{ contratos, reloadRecords, loading, error }}
    >
      {children}
    </ContratosContext.Provider>
  );
}
export const UseContratosContext = (): contratosContextType => {
  const context = useContext(ContratosContext);
  if (!context) {
    throw new Error(
      "UseContratosContext debe usarse dentro de un ContextProvider"
    );
  }
  return context;
};
