"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Users,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { getDashboardData } from "@/lib/hooks/services/universalFetch";
import { useQuery } from "@tanstack/react-query";

const DashboardContent = () => {
  const { data: session } = useSession();

  const { isPending, isError, data, isLoading, error, refetch } = useQuery({
    queryKey: ["getDashboardData"],
    queryFn: getDashboardData,
  });
  console.log("data===>", data);
  console.log("session===>", session?.user?.role === "admin");
  if (session?.user?.role === "user")
    return (
      <div className="flex-1 h-[85vh] flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <h3 className="text-3xl font-semibold text-gray-50">
            There is nothing to display for now.
          </h3>
          <p className="text-gray-400 text-lg">
            Your dashboard will show relevant data once you have some activity.
          </p>
        </div>
      </div>
    );
  return (
    <>
      <div className="w-full flex mb-8 gap-8">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">${data?.total_sales}</div>
            <p className="text-sm text-muted-foreground">
              {/* +20.1% from last month */}
            </p>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Total Orders</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">+{data?.total_orders}</div>
            {/* <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p> */}
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Total beats</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">+{data?.total_beats}</div>
            {/* <p className="text-xs text-muted-foreground">
              +19% from last month
            </p> */}
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Total Users</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">+{data?.total_users}</div>
            {/* <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p> */}
          </CardContent>
        </Card>
      </div>

      {/* <Card className="sm:col-span-2 mb-8">
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl">Your Orders</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            Introducing Our Dynamic Orders Dashboard for Seamless Management and
            Insightful Analysis.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button>Create New Order</Button>
        </CardFooter>
      </Card> */}

      <Card className="xl:col-span-2 mb-8">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-1">
            <CardTitle className="text-xl font-semibold">
              Recent Orders
            </CardTitle>
            <CardDescription className="text-sm">
              Recent Orders from your store.
            </CardDescription>
          </div>
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="#">
              View All
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-sm">Customer</TableHead>
                <TableHead className="hidden xl:table-column text-sm">
                  Type
                </TableHead>
                <TableHead className="hidden xl:table-column text-sm">
                  Status
                </TableHead>
                <TableHead className="hidden xl:table-column text-sm">
                  Date
                </TableHead>
                <TableHead className="text-right text-sm">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="font-medium text-sm">Liam Johnson</div>
                  <div className="hidden text-xs text-muted-foreground md:inline">
                    liam@example.com
                  </div>
                </TableCell>
                <TableCell className="hidden xl:table-column text-sm">
                  Sale
                </TableCell>
                <TableCell className="hidden xl:table-column">
                  <Badge className="text-xs" variant="outline">
                    Approved
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell lg:hidden xl:table-column text-sm">
                  2023-06-23
                </TableCell>
                <TableCell className="text-right text-sm">$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="font-medium text-sm">Olivia Smith</div>
                  <div className="hidden text-xs text-muted-foreground md:inline">
                    olivia@example.com
                  </div>
                </TableCell>
                <TableCell className="hidden xl:table-column text-sm">
                  Refund
                </TableCell>
                <TableCell className="hidden xl:table-column">
                  <Badge className="text-xs" variant="outline">
                    Declined
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell lg:hidden xl:table-column text-sm">
                  2023-06-24
                </TableCell>
                <TableCell className="text-right text-sm">$150.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="font-medium text-sm">Noah Williams</div>
                  <div className="hidden text-xs text-muted-foreground md:inline">
                    noah@example.com
                  </div>
                </TableCell>
                <TableCell className="hidden xl:table-column text-sm">
                  Subscription
                </TableCell>
                <TableCell className="hidden xl:table-column">
                  <Badge className="text-xs" variant="outline">
                    Approved
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell lg:hidden xl:table-column text-sm">
                  2023-06-25
                </TableCell>
                <TableCell className="text-right text-sm">$350.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="font-medium text-sm">Emma Brown</div>
                  <div className="hidden text-xs text-muted-foreground md:inline">
                    emma@example.com
                  </div>
                </TableCell>
                <TableCell className="hidden xl:table-column text-sm">
                  Sale
                </TableCell>
                <TableCell className="hidden xl:table-column">
                  <Badge className="text-xs" variant="outline">
                    Approved
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell lg:hidden xl:table-column text-sm">
                  2023-06-26
                </TableCell>
                <TableCell className="text-right text-sm">$450.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="font-medium text-sm">Liam Johnson</div>
                  <div className="hidden text-xs text-muted-foreground md:inline">
                    liam@example.com
                  </div>
                </TableCell>
                <TableCell className="hidden xl:table-column text-sm">
                  Sale
                </TableCell>
                <TableCell className="hidden xl:table-column">
                  <Badge className="text-xs" variant="outline">
                    Approved
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell lg:hidden xl:table-column text-sm">
                  2023-06-27
                </TableCell>
                <TableCell className="text-right text-sm">$550.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default DashboardContent;
