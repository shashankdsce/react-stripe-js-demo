import React from "react";
import ReactDOM from "react-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { BrowserRouter } from "react-router-dom";

import ElementDemos from "./components/ElementDemos";
import CardForm from "./components/demos/CardForm";
import FpxBankForm from "./components/demos/FpxBankForm";
import IbanForm from "./components/demos/IbanForm";
import IdealBankForm from "./components/demos/IdealBankForm";
import PaymentRequestForm from "./components/demos/PaymentRequestForm";
import SplitForm from "./components/demos/SplitForm";
import AfterpayClearpayMessage from "./components/demos/AfterpayClearpayMessage";

import "./styles.css";

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const demos = [
  {
    path: "/card-element",
    label: "CardElement",
    component: CardForm
  },
  {
    path: "/split-card-elements",
    label: "Split Card Elements",
    component: SplitForm
  },
  {
    path: "/payment-request-button-element",
    label: "PaymentRequestButtonElement",
    component: PaymentRequestForm
  },
  {
    path: "/ideal-bank-element",
    label: "IdealBankElement",
    component: IdealBankForm
  },
  {
    path: "/iban-element",
    label: "IbanElement",
    component: IbanForm
  },
  {
    path: "/fpx-bank-element",
    label: "FpxBankElement",
    component: FpxBankForm
  },
  {
    path: "/afterpay-clearpay-message",
    label: "AfterpayClearpayMessageElement",
    component: AfterpayClearpayMessage
  }
];

const App = () => {
  return (
    <BrowserRouter>
      <Elements stripe={stripePromise}>
        <ElementDemos demos={demos} />
      </Elements>
    </BrowserRouter>
  );
};

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
