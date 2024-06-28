/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "./Servicios.scss";
import { TfiSearch } from "react-icons/tfi";
import data from "./MOCK_DATA.json";
import { TbDatabaseHeart } from "react-icons/tb";
import { TbLayoutGridAdd } from "react-icons/tb";
import { ServiceCard } from "../../components/Shared/Cards/ServiceCard/ServiceCard";
import { useState } from "react";
import { HeaderForm } from "../../components/Shared/Headers/HeaderForm";
import { Form } from "./Form";
import { IMenuActions } from "../../commons/interfaces/menu-actions";
import { ReportOptions } from "../../components/ReportOptions/ReportOptions";
import {
  IServicios,
  dataServiciosTable,
} from "../../Interfaces/Servicios/servicios.interface";
import { UseServiciosContext } from "../../context/servicios.context";

export function Servicios() {
  const { servicios: servicios, loading, error } = UseServiciosContext();
  const title = "Servicios";

  const [typeActions, setTypeActions] = useState<string>("Form");
  const [titleActions, setTitleActions] = useState<string>(
    "+ Agregar un nuevo servicio"
  );
  const [selectedData, setSelectedData] = useState<IServicios | null>(null);
  const openForm = (): void => {
    setTypeActions("Form");
    setTitleActions("+ Agregar un nuevo servicio");
  };
  const openReport = () => {
    setTypeActions("Report");
    setTitleActions("Genera un reporte");
  };
  const renderActions = () => {
    console.log("render actions...");
    switch (typeActions) {
      case "Report":
        console.log("render actions...");

        return <ReportOptions data={Object.keys(data[0])} />;
      case "Edit":
        console.log("render edit...");

        return <Form data={selectedData} returnForm={openForm} />;
      case "Form":
        console.log("render form...");
        return <Form data={null} />;
      default:
        return null;
    }
  };
  const handleSelect = (data: IServicios) => {
    setSelectedData(data);
    setTypeActions("Edit");
    setTitleActions("Editar servicio");
  };
  const menuActions: IMenuActions[] = [
    {
      id: 1,
      icon: TbDatabaseHeart,
      title: "Reportes",
      onClick: openReport,
    },
    {
      id: 2,
      icon: TbLayoutGridAdd,
      title: "Agregar",
      onClick: openForm,
    },
  ];
  const [searchTerm, setSearchTerm] = useState<string>("");
  let filteredServices: dataServiciosTable[] | null;
  if (!servicios) {
    return null;
  } else {
    filteredServices = servicios.filter((item) => {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        item.nombre.toLowerCase().includes(searchTermLower) ||
        item.descripcion.toLowerCase().includes(searchTermLower) ||
        item.tipo.toLowerCase().includes(searchTermLower) ||
        item.valor.toString().toLowerCase().includes(searchTermLower)
      );
    });
  }

  return (
    <div className="Container-servicios">
      <div className="container-list">
        <HeaderForm menuActions={menuActions} title={title} />
        <section className="body">
          <div className="search ">
            <TfiSearch />
            <div className="input-group type-google">
              <input
                type="text"
                className=""
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                required
                placeholder=""
              />
              <label htmlFor="">Buscar</label>
            </div>
          </div>
          <div className="slider-cards">
            {" "}
            {filteredServices.map((filteredService) => (
              <ServiceCard
                data={filteredService}
                key={filteredService.id}
                selectData={handleSelect}
              />
            ))}
          </div>
        </section>
      </div>
      <div className="container-actions">
        <div className="actions">
          <section className="header">
            <h2>{titleActions}</h2>
          </section>
          <section className="body">{renderActions()}</section>
        </div>
      </div>
    </div>
  );
}
