"use client";
import React from "react";
import { DataTable } from "../ui/datatable/data-table";
import { usersListColumns } from "@/constants/table-columns/user-list-column";
import { userListData } from "@/constants/table-dummy-data/table-dummy-data";
import { useQuery } from "@tanstack/react-query";
import { getAllUsersList } from "@/lib/hooks/services/universalFetch";

const UsersPage = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["allUsersList"],
    queryFn: getAllUsersList,
  });
  return (
    <div className="w-full mx-auto">
      <DataTable data={userListData} columns={usersListColumns} />
    </div>
  );
};

export default UsersPage;
