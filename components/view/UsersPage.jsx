"use client";
import React from "react";
import { DataTable } from "../ui/datatable/data-table";
import { usersListColumns } from "@/constants/table-columns/user-list-column";
import { useQuery } from "@tanstack/react-query";
import { getAllUsersList } from "@/lib/hooks/services/universalFetch";

const UsersPage = () => {
  const {
    isLoading,
    isPending,
    isError,
    data: allUsers,
    error,
  } = useQuery({
    queryKey: ["allUsersList"],
    queryFn: getAllUsersList,
  });

  console.log("all user ", allUsers);
  return (
    <div className="w-full mx-auto">
      <DataTable
        data={allUsers ?? []}
        columns={usersListColumns}
        isLoading={isLoading}
      />
    </div>
  );
};

export default UsersPage;
