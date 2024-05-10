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
          src={row.original.userImg}
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
        {row.original.email}
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
    cell: ({ row }) => <div>{row.original.phoneNo}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <>
        <Badge
          className={`${
            row.original.status === "Completed"
              ? "bg-primary hover:bg-slate-200"
              : row.original.status === "Failed"
              ? "bg-red-500 hover:bg-red-400"
              : ""
          } text-black`}
        >
          {row.original.status}
        </Badge>
      </>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => <div>{row.original.amount}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "createAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => <div>{row.original.createAt}</div>,
    enableSorting: false,
    enableHiding: false,
  },
];

export const blogsListColumns = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID#" />
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
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="max-w-md">
        <Link
          href={`/dashboard/blogs/update/${row.original.id}`}
          className="text-xl hover:underline max-w-md w-64 font-bold line-clamp-1"
        >
          {row.original.title}
        </Link>

        {/* <p className=" line-clamp-2">{row.original.description}</p> */}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "tags",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tags" />
    ),
    cell: ({ row }) => (
      <>
        {row.original.tags.split(",").map((item, index) => (
          <Badge className="my-1 mr-1" key={index}>
            {item}
          </Badge>
        ))}
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
    cell: ({ row }) => (
      <>
        <Badge
          className={`${
            row.original.status === "Active"
              ? "bg-primary hover:bg-slate-200"
              : row.original.status === "Failed"
              ? "bg-red-500 hover:bg-red-400"
              : ""
          } text-black`}
        >
          {row.original.status}
        </Badge>
      </>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "createAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Create At" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[500px] w-[300px]">{row.original.createAt}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
