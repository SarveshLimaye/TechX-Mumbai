const express = require("express");
const router = express.Router();

const {
  getCFPs,
  getCFPById,
  createCFP,
  getCFPByEventId,
  approveCFP,
} = require("../controller/cfp");

router.route("/").get(getCFPs);
router.route("/:id").get(getCFPById);
router.route("/add").post(createCFP);
router.route("/event/:id").get(getCFPByEventId);
router.route("/approval/:id").put(approveCFP);

module.exports = router;
