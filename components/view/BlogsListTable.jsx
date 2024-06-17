"use client";
import React, { useState } from "react";
import { DataTable } from "../ui/datatable/data-table";
import { useQuery } from "@tanstack/react-query";
import {
  deleteBlogById,
  getAllBlogList,
} from "@/lib/hooks/services/universalFetch";
import { DataTableColumnHeader } from "../ui/datatable/data-table-column-header";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
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

const BlogsListTable = () => {
  const [loading, setLoading] = useState(false);
  const { isPending, isError, data, isLoading, error, refetch } = useQuery({
    queryKey: ["allBlogList"],
    queryFn: getAllBlogList,
  });

  const handleDelete = async (blog_id) => {
    try {
      setLoading(true);
      const res = await deleteBlogById(blog_id);
      if (res.status === 200) {
        toast.success("Blog Delete Successfully");
        refetch();
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  const blogsListColumns = [
    {
      accessorKey: "author_id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID#" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <Image
            src={row?.original?.image ?? "/assets/images/login/placeholder.svg"}
            alt={row.original.name ?? "image"}
            className="rounded-md w-[50px] h-[50px]"
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
            href={`/dashboard/blogs/update/${row.original.blog_id}`}
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
        <div className="max-w-lg w-full">
          <div className="flex items-center gap-2">
            {row.original.tags
              .split(",")
              .slice(0, 4)
              .map((item, index) => (
                <Badge key={index} className="my-1 text-xl mx-4 mr-1">
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
        <div className="max-w-[200px] text-xl w-[135px]">
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
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Trash2Icon />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-black border-gray-500">
              <DialogHeader>
                <DialogTitle className="text-2xl">Delete Blog</DialogTitle>
              </DialogHeader>
              <h1 className="text-2xl font-bold">
                Are you sure you want to delete this blog ?
              </h1>
              <DialogFooter>
                <Button
                  disabled={loading}
                  type="submit"
                  onClick={() => handleDelete(row.original.blog_id)}
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

  console.log("first", data);
  return (
    <div className="w-full mx-auto">
      <DataTable
        data={data ?? []}
        isLoading={isLoading}
        columns={blogsListColumns}
      />
    </div>
  );
};

export default BlogsListTable;
