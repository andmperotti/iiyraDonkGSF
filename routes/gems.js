const express = require("express");
const router = express.Router();
const gemsController = require("../controllers/gems");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, gemsController.getGems);

module.exports = router;
