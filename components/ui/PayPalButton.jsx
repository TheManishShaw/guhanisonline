// components/PayPalButton.js
"use client";
import { updateOrderById } from "@/lib/hooks/services/universalFetch";
import { clearCart } from "@/lib/store/features/cart/Cart";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <PayPalButtons
      style={{ layout: "vertical" }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: amount,
              },
            },
          ],
        });
      }}
      onApprove={(data, actions) => {
        return actions.order.capture().then(async (details) => {
          try {
            const order_id = localStorage.getItem("orderDetails");
            const formData = {
              transaction_id: details.id,
              payment_method: "credit_card",
              amount: details?.purchase_units[0]?.amount?.value,
            };
            const res = await updateOrderById(order_id, formData);
            if (res.status === 200) {
            }
            toast.success(res?.data?.message);
            localStorage.removeItem("orderDetails");
            dispatch(clearCart());
            router.push("/dashboard/orders");
          } catch (error) {
            console.log("error", error);
          }
          onSuccess(details);
        });
      }}
      onError={(err) => {
        onError(err);
      }}
    />
  );
};

export default PayPalButton;
