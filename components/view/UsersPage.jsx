import React from "react";
import { DataTable } from "../ui/datatable/data-table";
import { usersListColumns } from "@/constants/table-columns/user-list-column";
import { userListData } from "@/constants/table-dummy-data/table-dummy-data";

const UsersPage = () => {
  return (
    <div className="w-full mx-auto">
      <DataTable data={userListData} columns={usersListColumns} />
    </div>
  );
};

export default UsersPage;
