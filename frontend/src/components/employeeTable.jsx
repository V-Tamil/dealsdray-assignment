import React, { useState, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

function EmployeeTable(props) {
  const [sorting, setSorting] = useState([]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "employeeId",
        cell: (info) => info.getValue(),
        header: "Serial No",
      },
      {
        accessorKey: "image",
        cell: (info) => (
          <img className="dp-image" src={info.getValue()} alt="" />
        ),
        header: "Image",
      },
      {
        accessorKey: "name",
        cell: (info) => info.getValue(),
        header: "Name",
      },
      {
        accessorKey: "email",
        cell: (info) => info.getValue(),
        header: "Email",
      },
      {
        accessorKey: "mobile",
        cell: (info) => info.getValue(),
        header: "Phone Number",
      },
      {
        accessorKey: "gender",
        cell: (info) => info.getValue(),
        header: "Gender",
      },
      {
        accessorKey: "course",
        cell: (info) => info.getValue(),
        header: "Course",
      },
      {
        accessorKey: "createdAt",
        cell: (info) => new Date(info.getValue()).toLocaleDateString(),
        header: "Create Date",
      },
      {
        accessorKey: "_id",
        cell: (info) => (
          <div className="action-btns">
            <button
              className="btn"
              onClick={() => props.onEdit(info.getValue())}
            >
              Edit
            </button>
            <button
              className="d-btn"
              onClick={() => props.onDelete(info.getValue())}
            >
              Delete
            </button>
          </div>
        ),
        header: "Actions",
      },
    ],
    [props]
  );

  const table = useReactTable({
    columns,
    data: props.data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <table className="employee-table">
      <thead className="table-header">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr className="" key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      className={
                        header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : ""
                      }
                      onClick={header.column.getToggleSortingHandler()}
                      title={
                        header.column.getCanSort()
                          ? header.column.getNextSortingOrder() === "asc"
                            ? "Sort ascending"
                            : header.column.getNextSortingOrder() === "desc"
                            ? "Sort descending"
                            : "Clear sort"
                          : undefined
                      }
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted()] ?? null}
                    </div>
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody className="">
        {table.getRowModel().rows.map((row) => {
          return (
            <tr className="" key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <td className="" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default EmployeeTable;
