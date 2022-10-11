const express = require("express");
const { register, login, logout, forgotPassword, resetPassword, sendContact } = require("../controlers/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/send-contact', sendContact);



module.exports = router;
