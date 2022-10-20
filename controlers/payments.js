const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  
const stripePayment = async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: "gbp"
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  });
};

// For handling payment on stripe 
// const stripePayment = async (req, res) => {
//     try {
      
//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ["card"],
//         // purchase details
//         line_items: [
//           {
//             price_data: {
//                 currency: "gbp",
//                 product_data: {
//                     name: "Get contact"
//                 },
//                 unit_amount: 1000,
//             },
//             quantity: 1,
//           }
//         ],
//         mode: 'payment',
//         // redirect url after successful payment
//         success_url: process.env.STRIPE_SUCCESS_URL,
//         cancel_url: process.env.STRIPE_CANCEL_URL,
//       });
//       console.log("SESSION ID => ", session);
//       res.send(session.id);
//     } catch (err) {
//       console.log("PAID ENROLLMENT ERR", err);
//       return res.status(400).send("Enrollment create failed");
//     }
// };

const paypalPayment = async (req, res) => {
  res.json(process.env.PAYPAL_CLIENT_ID);
};

module.exports = { stripePayment, paypalPayment }