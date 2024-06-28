/* eslint-disable @typescript-eslint/no-unused-vars */
import { IMenuActions } from "../../commons/interfaces/menu-actions";
import "./Contratos.scss";
import data from "./MOCK_DATA.json";
import { Form } from "./Form";
import { TbDatabaseHeart, TbEdit } from "react-icons/tb";
import { RiFileList3Line } from "react-icons/ri";
import { useState } from "react";
import { ReportOptions } from "../../components/ReportOptions/ReportOptions";
import { Table } from "../../components/Table/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { UseContratosContext } from "../../context/contratos.context";
import {
  IContratoSocio,
  dataContratosTable,
} from "../../Interfaces/Contratos/contratos.interface";
import { IoPersonAddOutline } from "react-icons/io5";
export function Contratos() {
  const { contratos: contratos, loading, error } = UseContratosContext();
  console.log("data in Contratos: ", contratos);
  const lisTitle = "Contratos";
  const defaultData: dataContratosTable[] | null = contratos;
  const [selectedData, setSelectedData] = useState<dataContratosTable | null>(
    null
  );
  const [typeActions, setTypeActions] = useState<string>("Form");
  const [titleActions, setTitleActions] = useState<string>(
    "+ Agregar un nuevo contrato"
  );
  const openForm = (): void => {
    setTypeActions("Form");
    setTitleActions("+ Agregar un nuevo contrato");
  };
  const openReport = () => {
    setTypeActions("Report");
    setTitleActions("Genera un reporte");
  };
  const menuActions: IMenuActions[] = [
    {
      id: 1,
      icon: IoPersonAddOutline,
      title: "Agregar",
      onClick: openForm,
    },
    {
      id: 2,
      icon: TbDatabaseHeart,
      title: "Reportes",
      onClick: openReport,
    },
  ];

  const columnHelper = createColumnHelper<dataContratosTable>();
  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.socio.primerApellido, {
      id: "socio.primerApellido",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Apellido</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("socio.primerNombre", {
      header: () => "Nombre",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("barrio", {
      header: () => <span>Barrio</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("medidorSn", {
      header: "Medidor",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("estado", {
      header: "Estado",
      footer: (info) => info.column.id,
    }),
    columnHelper.display({
      header: "Actualizar",
      cell: ({ row }) => (
        <button
          onClick={() => {
            setSelectedData(row.original);
            setTypeActions("Edit");
            setTitleActions("Editar contrato");
          }}
        >
          <TbEdit />
        </button>
      ),
      footer: "Actualizar",
    }),
  ];
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
  if (!contratos) {
    return null;
  }
  return (
    <div className="Container-contratos ">
      <div className="container-list">
        <Table
          columns={columns}
          defaultData={defaultData}
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
