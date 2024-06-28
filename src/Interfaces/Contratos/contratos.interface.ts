import { ISocio, dataSociosTable } from "../Socios/socios.interface";

export interface dataContratosTable {
  socio: dataSociosTable;
  id: number | string;
  codigo: string;
  fecha: string;
  estado: string;
  medidorSn: string;
  barrio: number;
  callePrincipal: string;
  calleSecundaria: string;
  numeroCasa: string;
  referencia: string;
  principalSn: string;
  serviciosCompartidos: number;
}
export interface IContrato {
  socioId: string | number;
  id?: number | string;
  codigo: string;
  fecha: string;
  estado: string;
  medidorSn: string;
  barrio: string;
  callePrincipal: string;
  calleSecundaria: string;
  numeroCasa: string;
  referencia: string;
  principalSn: string;
  serviciosCompartidos?: number;
}
export interface IContratoSocio {
  contrato: IContrato;
  socio: ISocio;
}
