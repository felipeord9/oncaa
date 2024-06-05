const express = require("express");
const MailPublicoController = require("../../controllers/mailPublicoController");

const router = express.Router();

router.post("/send", MailPublicoController.sendMail);

module.exports = router;
