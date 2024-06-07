/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import "./Table.scss";
import { TfiSearch } from "react-icons/tfi";
import { useEffect, useReducer, useState } from "react";
import { TfiControlForward } from "react-icons/tfi";
import { TfiControlBackward } from "react-icons/tfi";
import { TfiControlSkipForward } from "react-icons/tfi";
import { TfiControlSkipBackward } from "react-icons/tfi";
import { IMenuActions } from "../../commons/interfaces/menu-actions";
type Props = {
  columns: any;
  defaultData: any;
  menuActions: IMenuActions[];
  showMenuActions?: boolean;
  listTitle: string;
  loading: boolean;
  error: string | null;
};

export function Table({
  columns,
  defaultData,
  menuActions,
  listTitle,
  showMenuActions,
  loading,
  error,
}: Props) {
  const [data, setData] = useState(defaultData);
  const rerender = useReducer(() => ({}), {})[1];
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState("");
  useEffect(() => {
    setData(defaultData);
  }, [defaultData]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });
  const renderItems = () => {
    if (showMenuActions) {
      return (
        <div className="Items">
          {menuActions.map((menuAction) => (
            <div
              className="item"
              key={menuAction.id}
              onClick={menuAction.onClick}
            >
              <menuAction.icon />
              <span>{menuAction.title}</span>
            </div>
          ))}
        </div>
      );
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  return (
    <div className="Table">
      <section className="header">
        <h1>{listTitle}</h1>
        {renderItems()}
      </section>
      <section className="body">
        <table className="">
          <thead className="thead-light">
            <tr>
              <th colSpan={defaultData.length}>
                <div>
                  <TfiSearch />
                  <input
                    className="search"
                    type="text"
                    value={filtering}
                    onChange={(e) => setFiltering(e.target.value)}
                  />
                </div>
              </th>
            </tr>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    onClick={header.column.getToggleSortingHandler()}
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {{ asc: "⬆️", desc: "⬇️" }[
                      header.column.getIsSorted() as string
                    ] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
        <div className="h-4" />
      </section>
      <div className="pagination">
        <button onClick={() => table.setPageIndex(0)}>
          <TfiControlSkipBackward />
        </button>
        <button onClick={() => table.previousPage()}>
          <TfiControlBackward />
        </button>
        <button onClick={() => table.nextPage()}>
          {" "}
          <TfiControlForward />
        </button>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
          <TfiControlSkipForward />
        </button>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
    </div>
  );
}
