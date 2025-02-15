"use client";

import { Clue } from "@/types/game";
import { ColumnDef } from "@tanstack/react-table";

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
    header: "Value",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("clue_value"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
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
