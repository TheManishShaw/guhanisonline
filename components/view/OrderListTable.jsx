import React from "react";
import { DataTable } from "../ui/datatable/data-table";
import {
  ordersDetailsData,
  tasks,
} from "@/constants/table-dummy-data/table-dummy-data";
import { ordersColumns } from "@/constants/table-columns/order-table-colum";

const OrderListTable = () => {
  return (
    <div className="w-full mx-auto">
      <DataTable data={ordersDetailsData} columns={ordersColumns} />
    </div>
  );
};

export default OrderListTable;
