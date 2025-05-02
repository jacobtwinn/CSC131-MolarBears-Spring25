import React from "react";
import "../CSS/PaymentSuccess.css";

const PaymentSuccess = () => {
  return (
    <div className="payment-success-container">
      <h2>🎉 Payment Successful!</h2>
      <p>Thank you for your payment. A receipt has been sent to your email.</p>
      <a href="/financial-history" className="back-link">
        Go Back to Financial History
      </a>
    </div>
  );
};

export default PaymentSuccess;