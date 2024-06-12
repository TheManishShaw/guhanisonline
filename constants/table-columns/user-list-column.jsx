"use client";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/datatable/data-table-column-header";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import {
  deleteBlogById,
  deleteCollectionById,
} from "@/lib/hooks/services/universalFetch";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const handleDeleteBeats = async (collection_id) => {
  try {
    const res = await deleteCollectionById(collection_id);
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

export const clienteleListColumns = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID#" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <Image
          src={row.original.photo ?? "/assets/images/login/placeholder.svg"}
          alt={row.original.name ?? "image"}
          className="rounded-md"
          width={50}
          height={50}
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
      <div className="max-w-md">
        <Link
          href={`/dashboard/clientele/update/${row.original.id}`}
          className="text-xl hover:underline max-w-md w-64 font-bold line-clamp-1"
        >
          {row.original.name}
        </Link>

        {/* <p className=" line-clamp-2">{row.original.description}</p> */}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "design",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Design " />
    ),
    cell: ({ row }) => (
      <>
        <span className="text-2xl"> {row.original.design}</span>
      </>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "testimonial",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Testimonial " />
    ),
    cell: ({ row }) => (
      <>
        <span className="text-2xl max-w-xl line-clamp-1">
          {" "}
          {row.original.testimonial}
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
      <div className="max-w-[200px] text-xl w-[130px]">
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

export const beatsListColumns = [
  {
    accessorKey: "cover_image_path",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID#" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <Image
          src={
            row.original.cover_image_path ??
            "/assets/images/login/placeholder.svg"
          }
          alt={row.original.title ?? "image"}
          className="rounded-md"
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
      <DataTableColumnHeader column={column} title="title" />
    ),
    cell: ({ row }) => (
      <div className="max-w-md">
        <Link
          href={`/dashboard/beats/${row.original.collection_id}`}
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
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description " />
    ),
    cell: ({ row }) => (
      <>
        <span className="text-2xl max-w-xl line-clamp-1">
          {" "}
          {row.original.description}
        </span>
      </>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price " />
    ),
    cell: ({ row }) => (
      <>
        <span className="text-2xl max-w-xl line-clamp-1">
          {" "}
          {row.original.price}
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
    accessorKey: "collection_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => (
      <div className="">
        <Button onClick={() => handleDeleteBeats(row.original.collection_id)}>
          <Trash2Icon />
        </Button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
