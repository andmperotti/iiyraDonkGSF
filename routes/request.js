const express = require("express");
const router = express.Router();
const requestController = require("../controllers/request");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, requestController.getRequestedItems);
router.post("/createRequestedItem", requestController.createRequestedItem);
router.put("/markComplete", requestController.markComplete);
router.put("/markUncomplete", requestController.markUncomplete);
router.delete("/deleteRequested", requestController.deleteRequested);

module.exports = router;
