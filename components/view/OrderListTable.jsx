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
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["allBlogList"],
    queryFn: getAllOrderList,
  });
  return (
    <div className="w-full mx-auto">
      <DataTable data={ordersDetailsData} columns={ordersColumns} />
    </div>
  );
};

export default OrderListTable;
