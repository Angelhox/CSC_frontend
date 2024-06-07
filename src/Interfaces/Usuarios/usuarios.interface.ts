export interface dataUsuariosTable {
  id: number;
  usuario: string;
  fechaModificacion: string;
  rol: {
    id: number;
    rol: string;
    rolDescripcion: string;
  };
  empleado: {
    id: number;
    cedula: string;
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    telefono: string;
    correo: string;
    usuarioSn: string;
  };
}
export interface IEmpleado {
  cedula: string;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  telefono: string;
  correo: string;
  usuarioSn: string;
  cargoId: string;
}
export interface IUsuario {
  usuario: string;
  clave: string;
  confirmClave: string;
  fechaModificacion: string;
  rolId: string;
}
export interface IEmpleadoUsuario {
  usuario: IUsuario;
  empleado: IEmpleado;
}
