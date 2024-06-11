// src/components/PayPalButton.js
import React, { useEffect } from 'react';

const PayPalButton = ({ amount }) => {
  useEffect(() => {
    window.paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: amount,
            },
          }],
        });
      },
      onApprove: (data, actions) => {
        return actions.order.capture().then((details) => {
          alert('Transaction completed by ' + details.payer.name.given_name);
        });
      },
      onError: (err) => {
        console.error(err);
        alert('Payment failed');
      },
    }).render('#paypal-button-container');
  }, [amount]);

  return (
    <div id="paypal-button-container"></div>
  );
};

export default PayPalButton;
