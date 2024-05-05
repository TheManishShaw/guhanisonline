"use client";

import Image from "next/image";
import { Badge } from "../badge";
import { DataTableColumnHeader } from "./data-table-column-header";
import Link from "next/link";

export const columns = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
    cell: ({ row }) => (
      <div>
        <Image
          src={row.original.posterImg}
          alt={row.original.name}
          className="rounded-lg"
          width={60}
          height={60}
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <Link href="/dashboard/beats/update" className="hover:underline">
        {row.original.name}
      </Link>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <Badge>{row.original.status}</Badge>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => <div>{row.original.price}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "totalSales",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Sales	" />
    ),
    cell: ({ row }) => <div>{row.original.totalSales}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "createAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Create At" />
    ),
    cell: ({ row }) => <div>{row.original.createAt}</div>,
    enableSorting: false,
    enableHiding: false,
  },
];
