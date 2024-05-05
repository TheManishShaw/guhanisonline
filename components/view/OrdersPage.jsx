import React from "react";
import { DataTable } from "../ui/datatable/data-table";

import { tasks } from "@/app/(root)/dashboard/beats/page";
import { ordersColumns } from "@/constants/table-columns/order-table-colum";

const OrdersPage = () => {
  return (
    <div className="w-full mx-auto">
      <DataTable data={tasks} columns={ordersColumns} />
    </div>
  );
};

export default OrdersPage;
