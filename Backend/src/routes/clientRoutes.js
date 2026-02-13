const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const authMiddleware = require("../middleware/authMiddleware");

// Public route
router.post("/", clientController.createClient);

// Protected routes
router.use(authMiddleware); // Applied to all routes below

router.get("/", clientController.getAllClients);
router.get("/filter", clientController.getClientsByDynamicFilter);
router.get("/dashboard-stats", clientController.getDashboardStats);
router.get("/recent-new", clientController.getRecentNewStudents);
router.get("/unviewed-counts", clientController.getUnviewedCounts);
router.get("/export", clientController.exportClientsToExcel);

// Domain & Course Stats
router.get("/stats/domain", clientController.getDomainStats);
router.get("/stats/course/:domain", clientController.getCourseStats);

// Filtered Fetching
router.get("/domain/:domain", clientController.getClientsByDomain);
router.get("/course/:course", clientController.getClientsByCourse);
router.get("/category/:category", clientController.getClientsByCategory);

// CRUD
router.patch("/:id/status", clientController.updateClientStatus);
router.delete("/:id", clientController.deleteClient);

// Viewed Status Updates
router.patch("/domain/viewed/:domain", clientController.markDomainAsViewed);
router.patch("/course/viewed/:course", clientController.markCourseAsViewed);
router.patch("/student/viewed/:clientId", clientController.markStudentAsViewed);
router.patch("/bulk-viewed", clientController.bulkMarkAsViewed);

// Maintenance
router.post("/auto-cleanup", clientController.autoMarkOldAsViewed);

module.exports = router;    