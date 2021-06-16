import React, { useMemo } from "react";
import { useStripe, useElements, IbanElement } from "@stripe/react-stripe-js";

import useResponsiveFontSize from "../../useResponsiveFontSize";

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      supportedCountries: ["SEPA"],
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#9e2146"
        }
      }
    }),
    [fontSize]
  );

  return options;
};

const IbanForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: "sepa_debit",
      sepa_debit: elements.getElement(IbanElement),
      billing_details: {
        name: event.target.name.value,
        email: event.target.email.value
      }
    });

    console.log("[PaymentMethod]", payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input name="name" type="text" placeholder="Jane Doe" required />
      </label>
      <label>
        Email
        <input
          name="email"
          type="email"
          placeholder="jane.doe@example.com"
          required
        />
      </label>
      <label>
        IBAN
        <IbanElement
          options={options}
          onReady={() => {
            console.log("IbanElement [ready]");
          }}
          onChange={event => {
            console.log("IbanElement [change]", event);
          }}
          onBlur={() => {
            console.log("IbanElement [blur]");
          }}
          onFocus={() => {
            console.log("IbanElement [focus]");
          }}
        />
      </label>
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default IbanForm;
