import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!stripe || !elements) return;

    setIsLoading(true);

    try {
      // 1) Create Payment Intent
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/create-payment-intent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: 1000 })
        }
      );

      const { clientSecret } = await res.json();

      // 2) Confirm payment with split elements
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardNumberElement),
          },
        }
      );

      if (error) {
        setMessage(error.message);
      } else if (paymentIntent.status === "succeeded") {
        navigate("/success");
      }

    } catch (err) {
      console.error(err);
      setMessage("Server error.");
      navigate("/cancel");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 450 }}>

      <div>
        <label>Card Number</label>
        <div style={styles.input}>
          <CardNumberElement />
        </div>
      </div>

      <div>
        <label>Expiry</label>
        <div style={styles.input}>
          <CardExpiryElement />
        </div>
      </div>

      <div>
        <label>CVC</label>
        <div style={styles.input}>
          <CardCvcElement />
        </div>
      </div>

      <button disabled={!stripe || isLoading} style={styles.button}>
        {isLoading ? "Processing..." : "Pay $10"}
      </button>

      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </form>
  );
}

const styles = {
  input: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginBottom: "20px",
    background: "#fff"
  },
  button: {
    padding: "14px",
    width: "100%",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  }
};
