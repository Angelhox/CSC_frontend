/* eslint-disable @typescript-eslint/no-explicit-any */
import "./ReportOptions.scss";
import { FormatReports } from "../../components/Shared/Select/FormatReports/FormatReports";
type Props = {
  data: any;
};
export function ReportOptions({ data }: Props) {
  return (
    <div className="OptionsReport">
      <div className="content">
        {" "}
        <FormatReports />
        <div className="input-group type-google text">
          <select name="" id="order-selector">
            {data.map((key: string | number, index: number) => {
              if (key !== "id")
                return (
                  <option key={index} value={key}>
                    {key}
                  </option>
                );
            })}
          </select>
          <label htmlFor="order-selector">Ordenar por</label>
        </div>
        <div className="order-options">
          <div>
            <input type="radio" name="order" />
            <label htmlFor="">Ascendente</label>
          </div>
          <div>
            <input type="radio" name="order" />
            <label htmlFor="">Descendente</label>
          </div>
        </div>
        <div className="data-radio">
          <label htmlFor="">Datos a mostrar</label>
          {data.map((key: string, index: number) => {
            if (key !== "id")
              return (
                <div key={index}>
                  <input type="checkbox" name={key} value={key} />
                  <label htmlFor={key}>{key}</label>
                </div>
              );
          })}
        </div>
      </div>
      <div className="buttons">
        {" "}
        <button>Generar</button>
      </div>
    </div>
  );
}
