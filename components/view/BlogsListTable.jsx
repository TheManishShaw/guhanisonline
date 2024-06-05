"use client";
import React from "react";
import { DataTable } from "../ui/datatable/data-table";
import { useQuery } from "@tanstack/react-query";
import { blogsListData } from "@/constants/table-dummy-data/table-dummy-data";
import { blogsListColumns } from "@/constants/table-columns/user-list-column";
import { getAllBlogList } from "@/lib/hooks/services/universalFetch";

const BlogsListTable = () => {
  const { isPending, isError, data, isLoading, error } = useQuery({
    queryKey: ["allBlogList"],
    queryFn: getAllBlogList,
  });
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
