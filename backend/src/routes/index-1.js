const { Router } = require("express");
const fortRoutes = require("./fort.routes");
const authRoutes = require("./authRoutes");
const reportRoutes = require("./reports"); // ✅ import reports route

const router = Router(); // make router first

// then use it
router.use("/forts", fortRoutes);
router.use("/auth", authRoutes);
router.use("/reports", reportRoutes); // ✅ enable reports API

// You can add more later if needed
// router.use("/maintenance", maintenanceRoutes)
// router.use("/upload", uploadRoutes)
// router.use("/analytics", analyticsRoutes)

module.exports = router;
