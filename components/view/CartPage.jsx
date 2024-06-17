"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import { XIcon } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { createOrder } from "@/lib/hooks/services/universalFetch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { removeFromCart } from "@/lib/store/features/cart/Cart";
const CartPage = () => {
  const { data: session } = useSession();
  const cartItems = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreateOrder = async () => {
    try {
      setIsLoading(true);
      const orderItems = cartItems.map((item) => ({
        collection_id: 10,
        amount: 212, // Assuming each item's price represents the total amount for that collection
      }));

      const payload = {
        collections: orderItems,
      };

      // Replace with your actual API call to create order
      const response = await createOrder(payload);
      console.log("respnose", response);
      if (response.status === 201) {
        toast.success("Order created successfully");
        console.log("Order created successfully!");
        localStorage.setItem("orderDetails", JSON.stringify(response));
        // localStorage.removeItem("cart");
        // router.push("/dashboard/orders");
        // Example redirect:
        // router.push('/order-confirmation');
      } else {
        // Handle error scenarios
        console.error("Failed to create order:", response.statusText);
        // Optionally show error message to user
      }
    } catch (error) {
      console.error("Error creating order:", error.message);
    }
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price; // Assuming item.price directly represents total amount
    }, 0);
  };

  const cartTotalAmount = calculateTotalAmount();

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };
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
                    item.cover_image_path
                      ? item.cover_image_path
                      : "/assets/images/login/placeholder.svg"
                  }
                  width={80}
                />
                <div className="grid gap-1">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-medium">${item.price}</div>
                  <Button
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    size="icon"
                    variant="ghost"
                    // disabled={isLoading}
                    onClick={() => handleRemoveFromCart(item)}
                    // disabled={!isInCart(collection.collection_id)}
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
          <Button
            disabled={cartItems.length === 0 || isLoading}
            className="w-full"
            size="lg"
            onClick={handleCreateOrder} // Corrected to onClick from onclick
          >
            Make order
          </Button>
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
