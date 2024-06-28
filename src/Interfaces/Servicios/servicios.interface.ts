export interface dataServiciosTable {
  id: number | string;
  nombre: string;
  descripcion: string;
  tipo: string;
  aplazableSn: string;
  valoresDistintosSn: string;
  individualSn: string;
  fechaCreacion: string;
  valor: number;
  numeroPagos: number;
  valorPagos: number;
}
export interface IServicios {
  id?: string | number;
  nombre: string;
  descripcion: string;
  tipo: string;
  aplazableSn: string|boolean;
  valoresDistintosSn: string;
  individualSn: string;
  fechaCreacion: string;
  valor: number;
  numeroPagos: number;
  valorPagos: number;
}
