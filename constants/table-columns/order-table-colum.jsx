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
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => <div className="w-[3rem]">{row.original.title}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "customer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    cell: ({ row }) => <div>{row.original.customer}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "product_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Id" />
    ),
    cell: ({ row }) => <div>{row.original.product_id}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => <Badge>{row.original.quantity}</Badge>,
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
    accessorKey: "createAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Create At" />
    ),
    cell: ({ row }) => <div>{row.original.createAt}</div>,
    enableSorting: false,
    enableHiding: false,
  },
];
