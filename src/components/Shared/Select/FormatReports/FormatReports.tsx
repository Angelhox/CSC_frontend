/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { cvs, pdf } from "../../../../assets";
import "./FormatReports.scss";
import { classNames } from "../../../../util/clases";
export function FormatReports() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("");
  function activate() {
    setIsOpen(!isOpen);
  }
  function selectOption(e: any) {
    setSelected(e.target.innerText);
    activate();
  }
  return (
    <div className="ContainerSelect">
      <div className="select-box">
        <div
          className={classNames(
            "selected-option input-group type-google",
            isOpen ? "active" : ""
          )}
          onClick={activate}
        >
          <input
            type="text"
            name="tipo-reporte"
            id="tipo-reporte"
            value={selected}
            readOnly
            placeholder=""
          />
          <label htmlFor="tipo-reporte">Formato</label>
        </div>
        <ul className="options">
          <li className="option" onClick={selectOption}>
            Pdf
            <img src={pdf} alt="" />
          </li>
          <li className="option" onClick={selectOption}>
            Cvs
            <img src={cvs} alt="" />
          </li>
        </ul>
      </div>
    </div>
  );
}
