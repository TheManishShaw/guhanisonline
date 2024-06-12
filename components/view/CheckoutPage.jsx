"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import PayPalButton from "../ui/PayPalButton";
import { useSession } from "next-auth/react";

const CheckoutPage = () => {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

  const handleSuccess = (details) => {
    setPaidFor(true);
    console.log("Transaction completed by " + details.payer.name.given_name);
  };

  const handleError = (err) => {
    setError(err);
    console.error("PayPal Checkout onError", err);
  };
  const { data: session } = useSession();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  return (
    <section className="container mx-auto my-12 flex items-center justify-center">
      {session?.user ? (
        <div className="rounded-lg border w-full max-w-2xl items-center bg-black p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Order Summary</h2>
          <div className="space-y-4">
            {cartItems &&
              cartItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Image
                      alt={item.title}
                      className="rounded-md"
                      height={64}
                      src={item.image}
                      style={{
                        aspectRatio: "64/64",
                        objectFit: "cover",
                      }}
                      width={64}
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-gray-500">
                        Wireless Noise Cancelling Headphones
                      </p>
                    </div>
                  </div>
                  <div className="text-lg font-semibold">${item.price}</div>
                </div>
              ))}

            {/* <Separator /> */}
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">Total</p>
              <p className="text-2xl font-bold">${totalAmount}</p>
            </div>
            {paidFor ? (
              <span>Payment Successful!</span>
            ) : (
              <PayPalButton
                amount={totalAmount}
                onSuccess={handleSuccess}
                onError={handleError}
              />
            )}
            {error && <span>Error: {error.message}</span>}
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default CheckoutPage;
