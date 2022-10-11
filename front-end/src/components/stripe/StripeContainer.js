import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import CardPayment from "./CardPayment"


const promise = loadStripe(window.env.PUBLIC_STRIPE_KEY)
console.log(promise);
export default function StripeContainer() {
	return (
		<Elements stripe={promise}>
			<CardPayment />
		</Elements>
	)
}