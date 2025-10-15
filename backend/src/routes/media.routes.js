const { Router } = require("express");
const { getMedia, uploadMedia, deleteMedia } = require("../controllers/media.controller");

const router = Router();

router.get("/", getMedia);
router.post("/", uploadMedia);
router.delete("/:id", deleteMedia);

module.exports = router;
