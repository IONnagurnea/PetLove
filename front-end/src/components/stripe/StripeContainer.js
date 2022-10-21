import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import CardPayment from "./CardPayment"


const promise = loadStripe("pk_test_51LnOTkGMkzOZDEpqY877r6r282N3tUhbz6r478YWH9PIClrmMbjXDg9I68aZTbr9Y6esmU8lDHV6roKbTInFmalE00spUUtwNv");
//console.log(promise);
export default function StripeContainer() {
	return (
		<Elements stripe={promise}>
			<CardPayment />
		</Elements>
	)
}