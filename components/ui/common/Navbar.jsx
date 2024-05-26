"use client";
import { CircleUser, Menu, Package2, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import Image from "next/image";

const Navbar = () => {
  const path = usePathname();
  const [cartItemLength, setCartItemLength] = useState();
  const user = false;

  const cartItems = useSelector((state) => state.cart.items);
  useEffect(() => {
    setCartItemLength(cartItems.length);
  }, [cartItems]);

  return (
    <>
      {
        <header className="sticky top-0 flex z-50 overflow-hidden w-full  h-20 items-center gap-4 border-b bg-background text-white backdrop-blur-lg px-4 md:px-6">
          <Link className="text-2xl" href="/">
            <Image
              src="/assets/images/logo/logo_white.png"
              width={50}
              height={50}
              alt="logo"
            />
          </Link>
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="ml-auto flex-1 sm:flex-initial">
              <div className="relative">
                <nav className="hidden flex-col gap-6 text-2xl font-medium md:flex md:flex-row md:items-center md:gap-5  lg:gap-6">
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
            <Link href="/cart">
              <div className="relative me-2">
                <ShoppingCart />
                {cartItemLength?.length != 0 ? (
                  <p className="-top-2 start-4 absolute w-full text-center bg-white border-2 text-black font-bold border-white  rounded-full">
                    {cartItemLength}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </Link>

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
                <nav className="grid gap-6  font-medium">
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
                className="bg-primary text-black text-2xl px-4 py-1 rounded-md"
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
