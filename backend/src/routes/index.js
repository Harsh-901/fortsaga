const { Router } = require("express");
const fortRoutes = require("./fort.routes");
const authRoutes = require("./authRoutes");
const reportRoutes = require("./report.routes");
// Add other routes as you build them

const router = Router(); // make router first

// then use it
router.use("/forts", fortRoutes);
router.use("/auth", authRoutes)
router.use("/reports", reportRoutes)
// router.use("/maintenance", maintenanceRoutes)
// router.use("/upload", uploadRoutes)
// router.use("/analytics", analyticsRoutes)

module.exports = router;
