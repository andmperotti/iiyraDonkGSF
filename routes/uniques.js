const express = require("express");
const router = express.Router();
const uniquesController = require("../controllers/uniques");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, uniquesController.getUniques);

module.exports = router;
