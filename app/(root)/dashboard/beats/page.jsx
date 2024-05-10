import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DashboardLayout from "@/components/ui/common/DashboardLayout";
import { columns } from "@/components/ui/datatable/coloums";
import { DataTable } from "@/components/ui/datatable/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BeatsListTable from "@/components/view/BeatsListTable";
import BeatsPage from "@/components/view/BeatsPage";
import {
  ChevronRightIcon,
  DownloadIcon,
  HeartIcon,
  MoreHorizontal,
  PlayIcon,
  PlusIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const tasks = [
  {
    id: "82",
    price: "29.39",
    posterImg: "/assets/images/login/placeholder.svg",
    audioUrl: "/assets/audio/Yimmy.mp3",
    name: "Yimmy Yimmy",
    singer: "unknown singer",
    status: "Active",
    createAt: "2023-07-12 10:42 AM",
    totalSales: "34",
  },
];
const page = () => {
  return (
    <>
      <Card>
        <CardHeader className="">
          <div className="flex items-center justify-between">
            <div className="">
              <CardTitle>Beats</CardTitle>
              <CardDescription>
                Manage your beats and view their sales performance.
              </CardDescription>
            </div>
            <div className=" ">
              <Link
                className="bg-primary text-black px-5 py-3 rounded-lg"
                href="/dashboard/beats/add"
              >
                Add Beats
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <BeatsListTable />
        </CardContent>
      </Card>
    </>
  );
};

export default page;
