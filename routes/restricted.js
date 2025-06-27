const express = require("express");
const router = express.Router();
const restrictedController = require("../controllers/restricted");

router.get("/", restrictedController.getRestricted);

module.exports = router;
