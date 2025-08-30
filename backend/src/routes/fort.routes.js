const { Router } = require("express");
const { getForts, getFortBySlug } = require("../controllers/fort.controller");
const router = Router();

router.get("/", getForts);
router.get("/:slug", getFortBySlug);

module.exports = router;
