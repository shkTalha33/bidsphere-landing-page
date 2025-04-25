/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { message } from "antd";
import React, { useEffect, useState } from "react";

const StripPayment = ({
  isTriger = false,
  email,
  setDisable,
  setIsLoading,
  redirectURL,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [messageData, setMessageData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) return;

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          message.success("Payment succeeded!");
          break;
        case "processing":
          message.info("Your payment is processing.");
          break;
        case "requires_payment_method":
          message.warning("Your payment was not successful, please try again.");
          break;
        default:
          message.error("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  useEffect(() => {
    if (elements) {
      const paymentElement = elements.getElement(PaymentElement);
      if (paymentElement) {
        paymentElement.on("change", (event) => {
          const isValid = !event.empty && event.complete;
          setDisable(!isValid);
        });
      }
    }
  }, [elements, setDisable]);

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      message.error("Stripe has not fully loaded.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + redirectURL,
        },
      });

      if (error) {
        message.error(error.message || "An unexpected error occurred.");
      }
    } catch (err) {
      message.error("An unexpected error occurred during payment.");
    } finally {
      setIsLoading(false);
    }
  };

  const paymentElementOptions = {
    layout: {
      type: "accordion",
      defaultCollapsed: false,
      radios: true,
      spacedAccordionItems: true,
    },
    defaultValues: {
      email,
    },
  };

  useEffect(() => {
    if (isTriger) {
      handleSubmit();
    }
  }, [isTriger]);

  return (
    <>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      {messageData && <div id="payment-message">{messageData}</div>}
    </>
  );
};

export default StripPayment;
