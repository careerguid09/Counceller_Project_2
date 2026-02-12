// routes/clientRoutes.js
const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const authMiddleware = require("../middleware/authMiddleware");

// Public route
router.post("/", clientController.createClient);

// Protected routes
router.get("/", authMiddleware, clientController.getAllClients);
router.delete("/:id", authMiddleware, clientController.deleteClient);
router.patch("/:id/status", authMiddleware, clientController.updateClientStatus);
router.get("/domain/:domain", authMiddleware, clientController.getClientsByDomain);
router.get("/category/:category", authMiddleware, clientController.getClientsByCategory);
router.get("/export", authMiddleware, clientController.exportClientsToExcel);

// NEW badge related routes
router.get("/filter", authMiddleware, clientController.getClientsByDynamicFilter);
router.get("/course/:course", authMiddleware, clientController.getClientsByCourse);
router.get("/stats/domain", authMiddleware, clientController.getDomainStats);
router.get("/stats/course/:domain", authMiddleware, clientController.getCourseStats);
router.get("/dashboard-stats", authMiddleware, clientController.getDashboardStats);
router.get("/recent-new", authMiddleware, clientController.getRecentNewStudents);
router.get("/unviewed-counts", authMiddleware, clientController.getUnviewedCounts);

// Mark as viewed routes
router.patch("/domain/viewed/:domain", authMiddleware, clientController.markDomainAsViewed);
router.patch("/course/viewed/:course", authMiddleware, clientController.markCourseAsViewed);
router.patch("/student/viewed/:clientId", authMiddleware, clientController.markStudentAsViewed);
router.patch("/bulk-viewed", authMiddleware, clientController.bulkMarkAsViewed);

// Auto cleanup route (can be called by cron job)
router.post("/auto-cleanup", authMiddleware, clientController.autoMarkOldAsViewed);

module.exports = router;