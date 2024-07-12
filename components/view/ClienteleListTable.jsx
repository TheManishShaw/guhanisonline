"use client";
import React, { useState } from "react";
import { DataTable } from "../ui/datatable/data-table";
import { useQuery } from "@tanstack/react-query";

import {
  deleteClienteleById,
  getAllClienteleList,
} from "@/lib/hooks/services/universalFetch";
import { DataTableColumnHeader } from "../ui/datatable/data-table-column-header";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Trash2Icon } from "lucide-react";
import moment from "moment";
import { toast } from "sonner";

const ClienteleListTable = () => {
  const { isPending, isError, data, isLoading, error, refetch } = useQuery({
    queryKey: ["getAllClienteleList"],
    queryFn: getAllClienteleList,
  });
  const [Loading, setLoading] = useState(false);

  const handleDeleteClientele = async (id) => {
    setLoading(true);
    try {
      const res = await deleteClienteleById(id);
      if (res.status === 200) {
        toast.success("Item Delete Successfully");
        refetch();
      }
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };
  const clienteleListColumns = [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID#" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-4 text-2xl  ">
          #{row.original.id}
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Photo" />
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
          <h1 className=" text-2xl"> {row.original.name}</h1>
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
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: ({ row }) => (
        <div className="">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Trash2Icon />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-black border-gray-500">
              <DialogHeader>
                <DialogTitle className="text-2xl">Delete Clientele</DialogTitle>
              </DialogHeader>
              <h1 className="text-2xl font-bold">
                Are you sure you want to this Clientele?
              </h1>
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={Loading}
                  onClick={() => handleDeleteClientele(row.original.id)}
                >
                  Confirm
                </Button>
                <DialogClose>
                  <Button variant="outline bg-gray-300 border-white">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];
  return (
    <div className="w-full mx-auto">
      <DataTable
        data={data ?? []}
        isLoading={isLoading}
        columns={clienteleListColumns}
      />
    </div>
  );
};

export default ClienteleListTable;
