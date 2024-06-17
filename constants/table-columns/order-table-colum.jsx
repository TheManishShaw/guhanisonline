"use client";

import Image from "next/image";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/datatable/data-table-column-header";
import moment from "moment";

export const ordersColumns = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order ID" />
    ),
    cell: ({ row }) => (
      <Link
        className="hover:underline"
        href={`/dashboard/orders/${row.original.id}`}
      >
        #{row.original.id}
      </Link>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "user",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    cell: ({ row }) => (
      <>
        <h1 className="text-xl">
          {row.original.user.first_name} {row.original.user.last_name}
        </h1>
      </>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <Badge className="text-xl">{row.original.status}</Badge>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "total_amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => (
      <>
        <h1 className="text-xl">$ {row.original.total_amount}</h1>
      </>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Create At" />
    ),
    cell: ({ row }) => (
      <div className="text-xl">
        {" "}
        {moment(row.original.created_at).format("MMMM Do YYYY  ")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
