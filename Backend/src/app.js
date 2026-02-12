  const express = require("express");
  const cors = require("cors");
  const clientRoutes = require("./routes/clientRoutes");
  const counselorRoutes = require("./routes/counselorRoutes");
  const app = express();


  app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use("/api/clients", clientRoutes);
  app.use("/api/counselor", counselorRoutes);

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  module.exports = app;