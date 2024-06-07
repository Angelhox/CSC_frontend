/* eslint-disable @typescript-eslint/no-unused-vars */
import { IMenuActions } from "../../commons/interfaces/menu-actions";
import "./Contratos.scss";
import data from "./MOCK_DATA.json";
import { Form } from "./Form";
import { TbDatabaseHeart } from "react-icons/tb";
import { RiFileList3Line } from "react-icons/ri";
import { useState } from "react";
import { ReportOptions } from "../../components/ReportOptions/ReportOptions";
import { Table } from "../../components/Table/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { HeaderForm } from "../../components/Shared/Headers/HeaderForm";
import { UseUsuariosContext } from "../../context/usuarios.context";
type Person = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  country: string;
  dateofbirth: string;
};

const lisTitle = "Contratos";
export function Contratos() {
  // const { usuarios: usuarios, loading, error } = UseUsuariosContext();
  const defaultData: Person[] = data;
  const columnHelper = createColumnHelper<Person>();
  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.name, {
      id: "name",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Name</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("lastname", {
      header: () => "lastname",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("email", {
      header: () => <span>Email</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("country", {
      header: "Country",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("dateofbirth", {
      header: "Date of Birth",
      footer: (info) => info.column.id,
    }),
  ];
  const [typeActions, setTypeActions] = useState<string>("Form");
  const [titleActions, setTitleActions] = useState<string>(
    "+ Agregar un nuevo administrador"
  );
  const openForm = (): void => {
    setTypeActions("List");
    setTitleActions("Contratos existentes");
  };
  const openReport = () => {
    setTypeActions("Report");
    setTitleActions("Genera un reporte");
  };
  const renderActions = () => {
    if (typeActions === "Report") {
      // return <ReportOptions data={Object.keys(data[0])} />;
      return (
        <div className="actions">
          <section className="header">{titleActions}</section>
          <section className="body">
            <ReportOptions data={Object.keys(data[0])} />
          </section>
        </div>
      );
    }
    return (
      <Table
        columns={columns}
        defaultData={defaultData}
        menuActions={menuActions}
        listTitle={lisTitle}
      />
    );
  };
  const title = "Crea un nuevo contrato";
  const menuActions: IMenuActions[] = [
    {
      id: 1,
      icon: RiFileList3Line,
      title: "Lista",
      onClick: openForm,
    },
    {
      id: 2,
      icon: TbDatabaseHeart,
      title: "Reportes",
      onClick: openReport,
    },
  ];

  return (
    <div className="Container-contratos ">
      <div className="container-list">
        <HeaderForm title={title} menuActions={menuActions} />
        <section className="body">
          <Form />
        </section>
      </div>
      <div className="container-actions">{renderActions()}</div>
    </div>
  );
}
