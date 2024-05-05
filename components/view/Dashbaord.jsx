import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import AddBeatForm from "../forms/AddBeatForm";
import { DataTable } from "../ui/datatable/data-table";
import { columns } from "../ui/datatable/coloums";

import DashboardLayout from "../ui/common/DashboardLayout";
import { PlusCircle } from "lucide-react";
import { tasks } from "@/app/(root)/dashboard/beats/page";

export function Dashboard() {
  return (
    <DashboardLayout>
      <div className="  border rounded-md p-6">
        <div className="flex items-center justify-between py-2">
          <h2 className=" font-bold text-2xl">Table Title</h2>
          <Dialog className="overflow-y-scroll mt-10">
            <DialogTrigger className="bg-primary text-black flex items-center p-2 rounded-xl gap-2 px-4">
              <PlusCircle className=" w-4 h-4" />
              Add Beat
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add new Sound Kit</DialogTitle>
              </DialogHeader>
              <AddBeatForm />
            </DialogContent>
          </Dialog>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </DashboardLayout>
  );
}
