"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import PayPalButton from "../ui/PayPalButton";

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
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  return (
    <section className="container mx-auto my-12 grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="rounded-lg border bg-black p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Billing Information</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" required type="text" />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" required type="text" />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" required type="email" />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" required rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" required type="text" />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input id="state" required type="text" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="zip">Zip Code</Label>
              <Input id="zip" required type="text" />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input id="country" required type="text" />
            </div>
          </div>
        </form>
      </div>
      <div className="rounded-lg border bg-black p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Order Summary</h2>
        <div className="space-y-4">
          {/* {cartItems &&
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
            ))} */}

          {/* <Separator /> */}
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">Total</p>
            {/* <p className="text-2xl font-bold">${totalAmount}</p> */}
          </div>
          {paidFor ? (
            <span>Payment Successful!</span>
          ) : (
            <PayPalButton
              amount="1.00"
              onSuccess={handleSuccess}
              onError={handleError}
            />
          )}
          {error && <span>Error: {error.message}</span>}
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
