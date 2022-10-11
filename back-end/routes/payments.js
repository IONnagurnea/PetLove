const express = require("express");
const { paypalPayment, stripePayment } = require("../controlers/payments");
const router = express.Router();

router.post("/card-payment", stripePayment);
router.get("/paypal-payment", paypalPayment);


module.exports = router;