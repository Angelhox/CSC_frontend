import useApi from "../api/commons/useApi";
import { ReactNode, createContext, useCallback, useContext } from "react";
import { dataRoles } from "../Interfaces/Roles/roles.interface";
import { getRoles } from "../api/Roles/roles.service";
interface rolesContextType {
  reloadRecords: () => void;
  roles: dataRoles[] | null;
  loading: boolean;
  error: string | null;
}
const RolesContext = createContext<rolesContextType | undefined>(undefined);
interface rolesProviderProps {
  children: ReactNode;
}
export function RolesProvider({ children }: rolesProviderProps) {
  const {
    data: roles,
    loading,
    error,
    refetch,
  } = useApi<dataRoles[]>(getRoles);
  const reloadRecords = useCallback(async () => {
    console.log("Reloading...");
    await refetch();
  }, [refetch]);
  return (
    <RolesContext.Provider value={{ roles, reloadRecords, loading, error }}>
      {children}
    </RolesContext.Provider>
  );
}
export const UseRolesContext = (): rolesContextType => {
  const context = useContext(RolesContext);
  if (!context) {
    throw new Error("UseRolesContext debe usarse dentro de un RolesProvider");
  }
  return context;
};
