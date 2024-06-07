import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth } from "../pages/Auth/Auth";
import { Home } from "../pages/Home/Home";
import LoggedLayout from "../layouts/LoggedLayout/LoggedLayout";
import { Administradores } from "../pages/Administradores/Administradores";
import { Socios } from "../pages/Socios/Socios";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { Contratos } from "../pages/Contratos/Contratos";
import { Servicios } from "../pages/Servicios/Servicios";
import { SociosProvider } from "../context/socios.context";
import { Example } from "../pages/Examples/Servicios";
import { TaskContextProvider } from "../pages/Examples/TaskContext";
import { ServiciosProvider } from "../context/servicios.context";
import { UsuariosProvider } from "../context/usuarios.context";
import { CargosProvider } from "../context/cargos.context";
import { RolesProvider } from "../context/roles.context";
export default function LoggedNavigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={
            <LoggedLayout>
              <Home />
            </LoggedLayout>
          }
        />
        <Route
          path="/socios"
          element={
            <LoggedLayout>
              <SociosProvider>
                <Socios />
              </SociosProvider>
            </LoggedLayout>
          }
        />
        <Route
          path="/administradores"
          element={
            <LoggedLayout>
              <UsuariosProvider>
                <CargosProvider>
                  <RolesProvider>
                    <Administradores />
                  </RolesProvider>
                </CargosProvider>
              </UsuariosProvider>
            </LoggedLayout>
          }
        />
        <Route
          path="/contratos"
          element={
            <LoggedLayout>
              <Contratos />
            </LoggedLayout>
          }
        />
        <Route
          path="/servicios"
          element={
            <LoggedLayout>
              <ServiciosProvider>
                <Servicios />
              </ServiciosProvider>
            </LoggedLayout>
          }
        />

        <Route
          path="/example"
          element={
            <LoggedLayout>
              <TaskContextProvider>
                <Example />
              </TaskContextProvider>
            </LoggedLayout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <LoggedLayout>
              <Dashboard />
            </LoggedLayout>
          }
        />
        <Route path="/" element={<Auth />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
