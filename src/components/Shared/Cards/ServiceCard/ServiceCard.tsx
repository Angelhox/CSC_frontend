/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IServicios,
  dataServiciosTable,
} from "../../../../Interfaces/Servicios/servicios.interface";
import { services } from "../../../../assets";
import "./ServiceCard.scss";
export interface Service {
  id: number;
  name: string;
  description: string;
  type: string;
  price: number;
}
type Props = {
  data: dataServiciosTable;
  selectData: (data: IServicios) => void;
};
export function ServiceCard({ data, selectData }: Props) {
  return (
    <>
      <div className="card" key={data.id}>
        <div className="card-content">
          <img src={services} alt="" className="card-img" />
          <h1 className="card-title">{data.nombre}</h1>
          <div className="card-body">
            <div className="card-description">{data.descripcion}</div>
            <div className="card-star">
              <span className="star">&#9733;</span>
              <span className="rating-value">{data.tipo}</span>
            </div>
            <p className="card-price">${data.valor}</p>
          </div>
          <div className="card-footer">
            <button
              className="btn btn-success"
              onClick={() => {
                // console.log("select data");
                selectData(data);
              }}
            >
              Actualizar
            </button>
            <button className="btn btn-border">Estadisticas</button>
          </div>
        </div>
      </div>
    </>
  );
}
