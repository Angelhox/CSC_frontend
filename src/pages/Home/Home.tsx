/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form } from "./Form";
import "./Home.scss";
import { Table } from "../../components/Table/Table";
import { createColumnHelper } from "@tanstack/react-table";
import data from "./MOCK_DATA.json";
import { TbDatabaseHeart } from "react-icons/tb";
import { IoPersonAddOutline } from "react-icons/io5";
import { IMenuActions } from "../../commons/interfaces/menu-actions";
type Person = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  country: string;
  dateofbirth: string;
};
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
const menuActions: IMenuActions[] = [
  {
    id: 1,
    icon: TbDatabaseHeart,
    title: "Reportes",
  },
  {
    id: 2,
    icon: IoPersonAddOutline,
    title: "Agregar",
  },
];
export function Home() {
  return (
    <div className="Container">
      <div className="container-list">
        <Table
          columns={columns}
          defaultData={defaultData}
          menuActions={menuActions}
        />
      </div>
      <div className="container-actions">
        <div className="actions">
          <section className="header">
            <h2>+ Agregar un nuevo socio</h2>
          </section>
          <section className="body">
            <Form />
          </section>
        </div>
      </div>
    </div>
  );
}
