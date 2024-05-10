import React from "react";
import { DataTable } from "../ui/datatable/data-table";
import { blogsListData } from "@/constants/table-dummy-data/table-dummy-data";
import { blogsListColumns } from "@/constants/table-columns/user-list-column";

const BlogsListTable = () => {
  return (
    <div className="w-full mx-auto">
      <DataTable data={blogsListData} columns={blogsListColumns} />
    </div>
  );
};

export default BlogsListTable;
