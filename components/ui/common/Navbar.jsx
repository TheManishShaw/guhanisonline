"use client";
import { CircleUser, Menu, ShoppingCart } from "lucide-react";
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
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "../sheet";
import { usePathname } from "next/navigation";
import { menuList } from "@/constants/menuitems/menuList";
import { useSelector } from "react-redux";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const path = usePathname();
  const [cartItemLength, setCartItemLength] = useState(0);
  const user = false;
  const [open, setOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const { data: session } = useSession();

  useEffect(() => {
    setCartItemLength(cartItems.length);
  }, [cartItems]);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  return (
    <>
      <header className="sticky top-0 flex z-[99] overflow-hidden w-full h-20 items-center gap-4 border-b bg-background text-white backdrop-blur-lg px-4 md:px-6">
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
              <nav className="hidden flex-col gap-6 text-2xl font-medium md:flex md:flex-row md:items-center md:gap-5 lg:gap-6">
                {menuList.map((menu, index) => (
                  <Link
                    key={index}
                    href={menu.path}
                    target={menu.target}
                    className={`${
                      path === menu.path
                        ? "text-primary"
                        : "text-muted-foreground"
                    } transition-colors hover:text-foreground`}
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
              {cartItemLength > 0 ? (
                <p className="-top-2 start-4 absolute w-full text-center bg-white border-2 text-black font-bold border-white rounded-full">
                  {cartItemLength}
                </p>
              ) : (
                ""
              )}
            </div>
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
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
            <SheetContent
              side="left"
              className="bg-background mt-20 text-white"
            >
              <nav className="grid gap-6 font-medium">
                {menuList.map((menu, index) => (
                  <Link
                    key={index + "mobile"}
                    href={menu.path}
                    className="text-white text-2xl hover:text-foreground"
                  >
                    {menu.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {session?.user ? (
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
              <DropdownMenuContent align="end" className="z-[99] ">
                <DropdownMenuLabel className="text-xl py-0">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-xl py-1 font-bold">
                  <Link href="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xl py-1 font-bold">
                  {session.user.name}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-xl py-1 font-bold cursor-pointer"
                  onClick={() => signOut()}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href={"/api/auth/signin"}
              className="bg-primary text-black text-2xl px-4 py-1 rounded-md"
            >
              Login
            </Link>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
