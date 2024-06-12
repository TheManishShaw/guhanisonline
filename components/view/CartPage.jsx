"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";
import { Card } from "../ui/card";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "@/lib/store/features/cart/Cart";
import Link from "next/link";
import { useSession } from "next-auth/react";

const CartPage = () => {
  const { data: session } = useSession();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * (item.quantity || 1);
    }, 0);
  };

  const cartTotalAmount = calculateTotalAmount();

  if (!isLoaded) {
    return "Loading..."; // Or a loading indicator
  }

  return (
    <section className="w-full max-w-4xl mx-auto py-8 md:py-12">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Your Cart</h1>
          <div className="text-gray-500 dark:text-gray-400">
            {cartItems.length || 0} items
          </div>
        </div>
        <div className="grid gap-4">
          {cartItems &&
            cartItems.map((item, index) => (
              <Card
                key={index}
                className="grid p-4 grid-cols-[80px_1fr_auto] items-center gap-4"
              >
                <Image
                  alt="Beat Thumbnail"
                  className="aspect-square rounded-md object-cover"
                  height={80}
                  src={
                    item.image
                      ? item.image
                      : "/assets/images/login/placeholder.svg"
                  }
                  width={80}
                />

                <div className="grid gap-1">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Produced by Beats Pro
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-medium">${item.price}</div>
                  <Button
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    size="icon"
                    variant="ghost"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    <XIcon className="h-5 w-5" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              </Card>
            ))}
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-800">
          <div className="text-lg font-medium">Total</div>
          <div className="text-2xl font-bold">
            ${cartTotalAmount.toFixed(2)}
          </div>
        </div>
        {session?.user ? (
          <Link href="/checkout">
            <Button
              disabled={cartItems.length === 0}
              className="w-full"
              size="lg"
            >
              Checkout
            </Button>
          </Link>
        ) : (
          <Link href="/api/auth/signin">
            <Button className="w-full" size="lg">
              Login
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default CartPage;
