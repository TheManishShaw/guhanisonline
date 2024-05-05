"use client";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/datatable/data-table-column-header";

export const usersListColumns = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <Image
          src={row.original.posterImg}
          alt={row.original.name}
          className="rounded-full"
          width={50}
          height={50}
        />
        <h1 className="text-xl font-bold">{row.original.name}</h1>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
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
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => <div>{row.original.price}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Name" />
    ),
    cell: ({ row }) => (
      <Badge className="bg-primary text-black">{row.original.status}</Badge>
    ),
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
