"use client";

import { Clue } from "@/types/game";
import { ColumnDef, SortDirection } from "@tanstack/react-table";
import { ArrowDown01, ArrowUp10, ArrowUpDown } from "lucide-react";

interface SortIconProps {
  sortState: false | SortDirection;
}

function SortIcon({ sortState }: SortIconProps) {
  switch (sortState) {
    case false:
      return <ArrowUpDown className="w-4 h-4" />;
    case "asc":
      return <ArrowDown01 className="w-4 h-4" />;
    case "desc":
      return <ArrowUp10 className="w-4 h-4" />;
    default:
      break;
  }
}

export const columns: ColumnDef<Clue>[] = [
  {
    accessorKey: "round",
    header: "Round",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "answer",
    header: "Clue",
  },
  {
    accessorKey: "question",
    header: "Answer",
  },
  {
    accessorKey: "clue_value",
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center">
          Value
          <div
            className="hover:text-gray-950 hover:cursor-pointer pl-2"
            onClick={() => column.toggleSorting()}
          >
            <SortIcon sortState={column.getIsSorted()} />
          </div>
        </div>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("clue_value"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      }).format(amount);

      return <div className="font-medium px-2">{formatted}</div>;
    },
    sortDescFirst: false,
  },
  {
    accessorKey: "air_date",
    header: "Air Date",
    cell: ({ row }) => {
      const airDate: Date = row.getValue("air_date");
      const formatted = airDate.toLocaleDateString("en-US");
      return <div>{formatted}</div>;
    },
  },
];
