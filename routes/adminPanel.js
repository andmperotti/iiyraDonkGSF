const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const admin = require("../controllers/admin.js");

router.get("/", ensureAuth, admin.getPanel);
router.post("/verifyUser",ensureAuth, admin.verifyUser);
router.post("/adminUser",ensureAuth, admin.adminUser);
router.delete("/deleteUser",ensureAuth, admin.deleteUser);

module.exports = router;
