"use client";
import React, { useState } from "react";
import { DataTable } from "../ui/datatable/data-table";
import { useQuery } from "@tanstack/react-query";
import {
  deleteCollectionById,
  getBeatsList,
} from "@/lib/hooks/services/universalFetch";
import { DataTableColumnHeader } from "../ui/datatable/data-table-column-header";
import { Button } from "../ui/button";
import { Trash2Icon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { toast } from "sonner";
import moment from "moment";

const BeatsListTable = () => {
  const [loading, setLoading] = useState(false);
  const { isPending, isError, data, isLoading, error, refetch } = useQuery({
    queryKey: ["getBeatsList"],
    queryFn: getBeatsList,
  });
  const handleDeleteBeats = async (collection_id) => {
    try {
      const res = await deleteCollectionById(collection_id);
      setLoading(true);
      if (res.status === 204) {
        toast.success("Beats Delete Successfully");
        refetch();
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };
  const beatsListColumns = [
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
            href={`/dashboard/beats/update/${row.original.collection_id}`}
            className="text-xl hover:underline max-w-md w-64 font-bold line-clamp-1"
          >
            {row.original.title}
          </Link>
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
        <div className="max-w-[200px] text-xl w-[130px]">
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
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Trash2Icon />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-black border-gray-500">
              <DialogHeader>
                <DialogTitle className="text-2xl">Delete Beat</DialogTitle>
              </DialogHeader>
              <h1 className="text-2xl font-bold">
                Are you sure you want to delete this Beat ?
              </h1>
              <DialogFooter>
                <Button
                  disabled={loading}
                  type="submit"
                  onClick={() => handleDeleteBeats(row.original.collection_id)}
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
        columns={beatsListColumns}
      />
    </div>
  );
};

export default BeatsListTable;
