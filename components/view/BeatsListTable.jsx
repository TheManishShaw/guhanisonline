"use client";
import React from "react";
import { DataTable } from "../ui/datatable/data-table";
import { useQuery } from "@tanstack/react-query";
import { beatsListColumns } from "@/constants/table-columns/user-list-column";
import { getBeatsList } from "@/lib/hooks/services/universalFetch";

const BeatsListTable = () => {
  const { isPending, isError, data, isLoading, error } = useQuery({
    queryKey: ["getBeatsList"],
    queryFn: getBeatsList,
  });
  console.log("first", data);
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
