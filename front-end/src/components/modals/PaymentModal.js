import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import "../../styles/pet.css";
import StripeContainer from '../stripe/StripeContainer';
import { AuthContext } from "../../context/AuthContext";
import Paypal from '../Paypal';
// import {loadStripe} from '@stripe/stripe-js';
// import Button from '@mui/material/Button';
// import { FaPaypal, FaStripe, } from "react-icons/fa";

const PaymentModal = ({openModal, setOpenModal, item}) => {

    const [showContact, setShowContact] = useState(false);
    const { user, stripeStatus, paypalStatus, dispatch } = useContext(AuthContext);

    //console.log("Stripe =>", stripeStatus);

    useEffect(() => {
         payment();
    }, [stripeStatus, paypalStatus]);

    const payment = async () => {
        const firstName=item.item.first_name;
        const phone=item.item.phone;
        const email=user.email;
        if(stripeStatus === true || paypalStatus === true) {
            const sendEmail = await axios.post("/send-contact", {email, firstName, phone});
            setOpenModal(false);
            setShowContact(true); 
        };  
    };

    // useEffect(()=>{
    //      dispatch({type:"CONTACT_HIDE"})
    //  },[])
    // payment on stripe page with a page to redirect to
    // const handleStripe = async () => {
    //     try {
    //         setOpenModal(!openModal);
    //         const { data } = await axios.post("/stripe-payment");
    //         const key = window.env.PUBLIC_STRIPE_KEY;
    //         console.log(key);
    //         const stripe = await loadStripe(window.env.PUBLIC_STRIPE_KEY);
    //         console.log(data);
    //         await stripe.redirectToCheckout({ sessionId: data });
    //         });
    //     } catch (err) {
    //         //toast("Enrollment failed, try again.");
    //         console.log(err);
    //     }  
    // }

    // change the payment state if user is closing the modal
    const hideContact = () => {
        dispatch({type:"CONTACT_HIDE"});
        setShowContact(!showContact);
    }

   // change the payment state is user is leaving the page
   window.addEventListener('popstate', (e) => dispatch({type:"CONTACT_HIDE"}));

   window.addEventListener("beforeunload", function (e) {
    e.preventDefault();
    e.returnValue = '';
    dispatch({type:"CONTACT_HIDE"})
    });

    return (
        <>
            <Modal
              open={openModal}
              onClose={() => setOpenModal(!openModal)}
              aria-labelledby="Payment Method"
              aria-describedby="choose payment method"
              width={720}
              footer={null}
            >
                <div className="payment">
                    <div className="paymentElements">
                        <h2>You will be charged £10 to get this breeder phone number</h2>
                        <div className="stripeContainer"><StripeContainer /></div>
                        <div className="paymentButtons">
                            <Paypal />
                        {/* <Button variant="contained" onClick={Paypal}>
                            <FaPaypal className="faIcon"/>
                        </Button> */}
                        {/* <Button variant="contained" onClick={handleStripe}>
                            <span><FaStripe  className="faIcon"/></span>
                        </Button>   */}
                        </div>  
                    </div>
                    
                </div>
            </Modal>

            <Modal
              open={showContact}
              onClose={hideContact}
              aria-labelledby="Contact"
              aria-describedby="Name and phone number"
              width={400}
              footer={null}
            >
                <div className="contactItems">
                    <h4>Your contact is:</h4>
                    <span>
                       <b>{item.item.first_name}:</b>
                       <b>{item.item.phone}</b>  
                    </span>
                    <p>These details are also sent to your email address</p>   
                </div>
            </Modal>
        </>
    )  
};

export default PaymentModal;