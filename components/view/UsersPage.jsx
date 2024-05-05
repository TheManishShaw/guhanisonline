import React from "react";
import { DataTable } from "../ui/datatable/data-table";
import { tasks } from "@/app/(root)/dashboard/beats/page";
import { ordersColumns } from "@/constants/table-columns/order-table-colum";
import { usersListColumns } from "@/constants/table-columns/user-list-column";

const UsersPage = () => {
  return (
    <div className="w-full mx-auto">
      <DataTable data={tasks} columns={usersListColumns} />
    </div>
  );
};

export default UsersPage;
