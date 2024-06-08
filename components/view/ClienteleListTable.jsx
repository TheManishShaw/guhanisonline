"use client";
import React from "react";
import { DataTable } from "../ui/datatable/data-table";
import { useQuery } from "@tanstack/react-query";
import { clienteleListColumns } from "@/constants/table-columns/user-list-column";
import { getAllClienteleList } from "@/lib/hooks/services/universalFetch";

const ClienteleListTable = () => {
  const { isPending, isError, data, isLoading, error } = useQuery({
    queryKey: ["getAllClienteleList"],
    queryFn: getAllClienteleList,
  });
  console.log("first", data);
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
