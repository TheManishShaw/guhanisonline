"use client";

import Image from "next/image";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/datatable/data-table-column-header";

export const ordersColumns = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order ID" />
    ),
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
      <DataTableColumnHeader column={column} title="Order Name" />
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
      <DataTableColumnHeader column={column} title="Customer Name" />
    ),
    cell: ({ row }) => <Badge>{row.original.status}</Badge>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => <div>{row.original.price}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "totalSales",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => <div>{row.original.totalSales}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "createAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => <div>{row.original.createAt}</div>,
    enableSorting: false,
    enableHiding: false,
  },
];
