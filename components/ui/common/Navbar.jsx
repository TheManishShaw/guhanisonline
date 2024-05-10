"use client";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Button } from "../button";
import { Sheet, SheetContent, SheetTrigger } from "../sheet";
import { usePathname } from "next/navigation";
import { menuList } from "@/constants/menuitems/menuList";

const Navbar = () => {
  const path = usePathname();
  const user = false;
  console.log("path", path);
  return (
    <>
      {
        <header className="sticky top-0 flex z-50  h-20 items-center gap-4 border-b bg-background text-white backdrop-blur-lg px-4 md:px-6">
          <Link href="/">Logo</Link>
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="ml-auto flex-1 sm:flex-initial">
              <div className="relative">
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                  {menuList.map((menu, index) => (
                    <Link
                      key={index}
                      href={menu.path}
                      target={menu.target}
                      className={` ${
                        path === menu.path
                          ? "text-primary"
                          : "text-muted-foreground"
                      }  transition-colors hover:text-foreground`}
                    >
                      {menu.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </form>
            <Sheet SheetClose={true}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5 text-black" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-background text-white">
                <nav className="grid gap-6 text-lg font-medium">
                  {menuList.map((menu, index) => (
                    <Link
                      key={index + "mobile"}
                      href={menu.path}
                      className="text-white hover:text-foreground"
                    >
                      {menu.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {/* <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href={"/sign-in"}
                className="bg-primary text-black px-4 py-2 rounded-md"
              >
                Login
              </Link>
            )}
          </div>
        </header>
      }
    </>
  );
};

export default Navbar;
