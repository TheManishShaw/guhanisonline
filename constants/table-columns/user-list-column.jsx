"use client";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/datatable/data-table-column-header";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { deleteBlogById } from "@/lib/hooks/services/universalFetch";
import { toast } from "sonner";

const handleDelete = async (blog_id) => {
  try {
    const res = await deleteBlogById(blog_id);
    if (res.status === 200) {
      toast.success("Item Delete Successfully");
    }
  } catch (error) {
    console.log("error", error);
  }
};
export const usersListColumns = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <Image
          src={
            row.original.userImg
              ? row.original.userImg
              : "/assets/images/login/placeholder.svg"
          }
          alt={row.original.name}
          className="rounded-full"
          width={50}
          height={50}
        />
        <h1 className="text-xl font-bold">
          {row.original.first_name} {row.original.last_name}{" "}
        </h1>
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
    cell: ({ row }) => (
      <div>{row.original.phoneNo ? row.original.phoneNo : "-"}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => (
      <Badge className="text-lg px-6 py-0">{row.original.role}</Badge>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => (
      <div>
        {row.original.city ? row.original.city : "-"}
        {","} {row.original.state ? row.original.state : "-"}
        {","} {row.original.country}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => (
      <div className="text-xl">
        {moment(row.original.created_at).format("MMMM Do YYYY  ")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

export const blogsListColumns = [
  {
    accessorKey: "author_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID#" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <Image
          src={row.original?.image ?? "/assets/images/login/placeholder.svg"}
          alt={row.original.name ?? "image"}
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
      <div className="max-w-xl w-xl">
        <div className="flex items-center gap-2">
          {row.original.tags
            .split(",")
            .slice(0, 4)
            .map((item, index) => (
              <Badge key={index} className="my-1 mx-4 mr-1">
                {item}
              </Badge>
            ))}
        </div>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "author",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Posted By" />
    ),
    cell: ({ row }) => (
      <>
        <span className="text-2xl">
          {" "}
          {row.original.author.first_name} {row.original.author.last_name}
        </span>
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
      <div className="max-w-[500px] text-xl w-[400px]">
        {moment(row.original.created_at).format("MMMM Do YYYY  ")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "blog_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => (
      <div className="">
        <Button onClick={() => handleDelete(row.original.blog_id)}>
          <Trash2Icon />
        </Button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
