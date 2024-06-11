"use client";
import React from "react";
import { DataTable } from "../ui/datatable/data-table";
import {
  ordersDetailsData,
  tasks,
} from "@/constants/table-dummy-data/table-dummy-data";
import { ordersColumns } from "@/constants/table-columns/order-table-colum";
import { getAllOrderList } from "@/lib/hooks/services/universalFetch";
import { useQuery } from "@tanstack/react-query";

const OrderListTable = () => {
  const {
    isPending,
    isError,
    data: orderList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getAllOrderList"],
    queryFn: getAllOrderList,
  });
  console.log("orders, ", orderList);
  return (
    <div className="w-full mx-auto">
      <DataTable
        data={orderList ?? []}
        isLoading={isLoading}
        columns={ordersColumns}
      />
    </div>
  );
};

export default OrderListTable;
