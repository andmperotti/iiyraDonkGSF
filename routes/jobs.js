const express = require("express");
const router = express.Router();
const jobsController = require("../controllers/jobs");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, jobsController.getJobs);
router.post("/createJob", jobsController.createJob);
router.delete("/deleteJob", jobsController.deleteJob);

module.exports = router;
