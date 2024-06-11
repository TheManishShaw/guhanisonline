// components/PayPalButton.js
import { PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
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
        return actions.order.capture().then((details) => {
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
