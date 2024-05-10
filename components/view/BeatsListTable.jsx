import React from "react";
import { columns } from "../ui/datatable/coloums";
import { DataTable } from "../ui/datatable/data-table";
import { tasks } from "@/app/(root)/dashboard/beats/page";

const BeatsListTable = () => {
  return (
    <div className="w-full mx-auto">
      <DataTable data={tasks} columns={columns} />
    </div>
  );
};

export default BeatsListTable;
