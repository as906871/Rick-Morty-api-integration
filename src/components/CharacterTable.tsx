import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";
import { useState } from "react";
import type { Character } from "../types";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

type Props = {
  data: Character[];
};

const CharacterTable: React.FC<Props> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const navigate = useNavigate();

  const columns = useMemo<ColumnDef<Character>[]>(
    () => [
      {
        id: "image",
        header: "Avatar",
        cell: (info) => (
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            src={info.row.original.image}
            alt={info.row.original.name}
            className="w-14 h-14 rounded-full border-2 border-indigo-200 shadow-sm"
          />
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: (info) => (
          <Link
            to={`/character/${info.row.original.id}`}
            className="text-indigo-600 font-medium hover:text-indigo-800 hover:underline transition"
            onClick={(e) => e.stopPropagation()} // Prevent row click when name clicked
          >
            {String(info.getValue())}
          </Link>
        ),
      },
      {
        accessorKey: "species",
        header: "Species",
        cell: (info) => (
          <span className="text-slate-700 font-medium">
            {String(info.getValue())}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const status = String(info.getValue());
          const color =
            status === "Alive"
              ? "bg-green-100 text-green-700 border-green-300"
              : status === "Dead"
              ? "bg-red-100 text-red-700 border-red-300"
              : "bg-gray-100 text-gray-700 border-gray-300";
          return (
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${color}`}
            >
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: "location",
        header: "Location",
        cell: (info) => (
          <span className="text-slate-600">{info.row.original.location.name}</span>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-hidden bg-white rounded-3xl shadow-lg border border-slate-100">
      <table className="min-w-full text-left">
        <thead className="bg-gradient-to-r from-indigo-50 to-slate-50 border-b border-slate-200">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((h) => (
                <th
                  key={h.id}
                  onClick={h.column.getToggleSortingHandler()}
                  className="px-6 py-4 text-sm font-semibold text-slate-700 uppercase cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-2">
                    {flexRender(h.column.columnDef.header, h.getContext())}
                    {h.column.getCanSort() && (
                      <span className="text-slate-400 group-hover:text-indigo-500 transition">
                        {h.column.getIsSorted() === "asc" ? (
                          <ArrowUp size={14} />
                        ) : h.column.getIsSorted() === "desc" ? (
                          <ArrowDown size={14} />
                        ) : (
                          <ArrowUpDown size={14} />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <motion.tr
              key={row.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(`/character/${row.original.id}`)}
              className="border-b hover:bg-indigo-50 transition cursor-pointer"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 text-sm text-slate-700 align-middle"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>

      {data.length === 0 && (
        <div className="py-8 text-center text-slate-500 font-medium">
          No characters found.
        </div>
      )}
    </div>
  );
};

export default CharacterTable;
