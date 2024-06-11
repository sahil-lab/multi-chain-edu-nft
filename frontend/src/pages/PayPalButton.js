import React from 'react';
import paypal from 'paypal-checkout-components';

const PayPalButton = ({ amount }) => {
  const PayPalButton = paypal.Button.driver('react', { React, ReactDOM });

  const payment = () => {
    return new paypal.Promise((resolve, reject) => {
      fetch('/api/payment/paypal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency: 'USD' }),
      })
        .then((res) => res.json())
        .then((data) => resolve(data.approvalUrl))
        .catch((err) => reject(err));
    });
  };

  const onAuthorize = (data, actions) => {
    return actions.redirect();
  };

  return (
    <PayPalButton
      payment={payment}
      onAuthorize={onAuthorize}
      style={{
        size: 'responsive',
        color: 'blue',
        shape: 'rect',
        label: 'checkout',
      }}
    />
  );
};

export default PayPalButton;
