"use client";
import Link from "next/link";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";
import { Home, ListMusic, PanelLeft, Rss } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../sheet";
import { Button } from "../button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import Image from "next/image";
import { redirect } from "next/navigation";
import { dashboardList } from "@/constants/menuitems/dashbaordMenu";
import LoginAndLogOutButton from "../LoginAndLogOutButton";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const DashboardLayout = ({ children }) => {
  const path = "";
  const loggedIn = true;
  const { data: session } = useSession();
  if (!session || !session.user) toast("not login");

  return (
    <div className="flex overflow-auto min-h-screen w-full flex-col text-white">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <Link
            href="/dashboard"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2  text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            Logo
            <span className="sr-only">logo</span>
          </Link>
          <TooltipProvider>
            {dashboardList.map((link, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.path}
                    className={`${
                      path === link.path ? "bg-accent" : ""
                    } flex h-9 w-9 items-center  justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                  >
                    {link.icon}
                    <span className="sr-only">{link.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{link.name}</TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex text-white flex-col sm:gap-4 pt-4 sm:pl-14">
        <header className="sticky justify-between  top-0 z-30 flex h-14 items-center gap-4  bg-background px-4 sm:static sm:h-auto  sm:bg-transparent sm:px-6">
          <Sheet className="bg-background">
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5 text-black" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs bg-background">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  logo
                  <span className="sr-only">logo</span>
                </Link>
                {dashboardList.map((link, index) => (
                  <Link
                    key={index}
                    href={link.path}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Breadcrumb className="hidden text-white md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href="/dashboard"
                    className="text-white hover:text-white/80"
                  >
                    Dashboard
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbPage>
                  <Link
                    href={path}
                    className="text-white capitalize hover:text-white/80"
                  >
                    {path.split("/")[2]}
                  </Link>
                </BreadcrumbPage>
              </BreadcrumbItem>
              {path.split("/")[3] && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      <Link
                        href={path}
                        className="text-white capitalize hover:text-white/80"
                      >
                        {path.split("/")[3]}
                      </Link>
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
          {/* <LoginAndLogOutButton /> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="/assets/images/avatar/avatar.png"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Link href="/sign-in">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="p-6 sm:px-6 sm:py-6 min-h-screen bg-muted/40">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
