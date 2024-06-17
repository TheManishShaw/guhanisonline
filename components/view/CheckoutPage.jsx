"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Image from "next/image";
import PayPalButton from "../ui/PayPalButton";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { ShoppingCartIcon, XIcon } from "lucide-react";
import { Card } from "../ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const [paidFor, setPaidFor] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsClient(true);
    const savedOrderDetails = localStorage.getItem("orderDetails");
    if (savedOrderDetails) {
      setOrderDetails(JSON.parse(savedOrderDetails));
    }
  }, []);

  const handleSuccess = (details) => {
    setPaidFor(true);
    toast.success("Order created successfully");
    console.log("Order created successfully!");

    localStorage.removeItem("cart");
    router.push("/dashboard/orders");
  };

  const handleError = (err) => {
    setError(err);
    console.error("PayPal Checkout onError", err);
  };

  const { data: session } = useSession();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price; // Assuming item.price directly represents total amount
    }, 0);
  };

  const cartTotalAmount = calculateTotalAmount();

  if (!isClient && !session?.user) {
    return null; // Avoid rendering until client-side
  }

  return (
    <section className="container mx-auto my-12 flex items-center justify-center">
      <div className="flex mx-20 justify-center container gap-8">
        <section className="w-full">
          <div className="border w-full max-w-5xl rounded-lg overflow-hidden">
            <div className="bg-black px-4 py-3 dark:bg-gray-800">
              <h2 className="text-lg font-medium">Your Cart</h2>
            </div>
            <section className="divide-y dark:divide-gray-700">
              {cartItems &&
                cartItems.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="flex p-4 items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        alt={item.title}
                        className="rounded-md"
                        height={64}
                        src={item.cover_image_path}
                        style={{
                          aspectRatio: "64/64",
                          objectFit: "cover",
                        }}
                        width={64}
                      />
                      <div>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="text-gray-500 max-w-2xl">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-2xl font-semibold pr-2">
                      ${item.price}
                    </div>
                  </div>
                ))}
            </section>
          </div>
        </section>
        <div className="w-[400px] rounded-lg p-6 bg-gray-900">
          <h2 className="text-2xl font-medium mb-4">Order Summary</h2>
          <section className="grid grid-cols-2 text-2xl gap-2">
            <span className="text-gray-500 dark:text-gray-400">Subtotal:</span>
            <span className="text-right font-medium">${cartTotalAmount}</span>

            <span className="text-gray-500 dark:text-gray-400">Total:</span>
            <span className="text-right font-medium">${cartTotalAmount}</span>
          </section>
          <section className="mt-6">
            {paidFor ? (
              <span>Payment Successful!</span>
            ) : (
              <PayPalButton
                amount={cartTotalAmount}
                onSuccess={handleSuccess}
                onError={handleError}
              />
            )}
            {error && <span>Error: {error.message}</span>}
          </section>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
