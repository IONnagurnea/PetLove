import React, { useState, useContext, useEffect } from 'react';
// import ReactDOM from 'react-dom';
import axios from 'axios';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { AuthContext } from "../context/AuthContext";

const Paypal = () => {
  const [sdkReady, setSdkReady] = useState();

  const { dispatch } = useContext(AuthContext);

  const currency = "GBP";

  useEffect(() => {
    clientId();
  }, []);

  const clientId = async () => {
      const result = await axios.get("/paypal-payment");
      const id = result.data;
      console.log("ID =>", id);
      setSdkReady(id);
  };

  const createOrder = (data, actions) => actions.order.create({
    purchase_units: [
      {
        amount: {
          value: "10",
        }
      }
    ]
  });

  const onApprove = (data, actions) => {
    return actions.order.capture().then(() => {
      dispatch({type:"PAYPAL_SUCCESS"});
    
    });
  };

  return (
    <PayPalScriptProvider 
        options={sdkReady} 
    >
      <PayPalButtons
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
      />
    </PayPalScriptProvider>
  );
}

export default Paypal;