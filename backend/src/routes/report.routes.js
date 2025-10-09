const { Router } = require("express");
const { getReports, createReport } = require("../controllers/report.controller");

const router = Router();

router.get("/", getReports);
router.post("/", createReport);

module.exports = router;
