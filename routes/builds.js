const express = require("express");
const router = express.Router();
const buildsController = require("../controllers/builds");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, buildsController.getBuilds);
router.post("/createBuild", buildsController.createBuild);
router.delete("/deleteBuild", buildsController.deleteBuild);

module.exports = router;
