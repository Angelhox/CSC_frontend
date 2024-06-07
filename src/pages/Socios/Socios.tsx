/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form } from "./Form";
import { Table } from "../../components/Table/Table";
import { createColumnHelper } from "@tanstack/react-table";
import data from "./MOCK_DATA.json";
import { TbDatabaseHeart } from "react-icons/tb";
import { IoPersonAddOutline } from "react-icons/io5";
import { IMenuActions } from "../../commons/interfaces/menu-actions";
import "./Socios.scss";
import { useState } from "react";
import { ReportOptions } from "../../components/ReportOptions/ReportOptions";
import { dataSociosTable } from "../../Interfaces/Socios/socios.interface";
import { getSocios } from "../../api/Socios/socio.service";
import useApi from "../../api/Socios/socio.api";
import { UseSocios } from "../../context/socios.context";
// import { ReportOptions } from "./ReportOptions";
type Person = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  country: string;
  dateofbirth: string;
};

const lisTitle = "Socios";
export function Socios() {
  const { socios: socios, loading, error } = UseSocios();
  const defaultData: dataSociosTable[] | null = socios;
  const columnHelper = createColumnHelper<dataSociosTable>();
  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("primerApellido", {
      header: () => "Apellido",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.primerNombre, {
      id: "name",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Nombre</span>,
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("cedulaPasaporte", {
      header: () => <span>Cédula|Pasaporte</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("correo", {
      header: "Correo",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("fechaNacimiento", {
      header: "Nacimiento",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("barrio", {
      header: "Barrio",
      footer: (info) => info.column.id,
    }),
  ];
  const [typeActions, setTypeActions] = useState<string>("Form");
  const [titleActions, setTitleActions] = useState<string>(
    "+ Agregar un nuevo socio"
  );
  const openForm = (): void => {
    setTypeActions("Form");
    setTitleActions("+ Agregar un nuevo socio");
  };
  const openReport = () => {
    setTypeActions("Report");
    setTitleActions("Genera un reporte");
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
      icon: IoPersonAddOutline,
      title: "Agregar",
      onClick: openForm,
    },
  ];
  const renderActions = () => {
    if (typeActions === "Report") {
      // return <ReportOptions data={Object.keys(data[0])} />;
      return <ReportOptions data={Object.keys(data[0])} />;
    }
    return <Form />;
  };
  if (!socios) {
    return null;
  }
  return (
    <div className="Container">
      <div className="container-list">
        {/* {JSON.stringify(socios)} */}
        <Table
          columns={columns}
          defaultData={socios}
          menuActions={menuActions}
          showMenuActions={true}
          listTitle={lisTitle}
          loading={loading}
          error={error}
        />
      </div>
      <div className="container-actions">
        <div className="actions">
          <section className="header">
            <h2>{titleActions}</h2>
          </section>
          <section className="body">
            {/* <Form /> */}
            {renderActions()}
          </section>
        </div>
      </div>
    </div>
  );
}
