const express = require("express");
const router = express.Router();

const services = [
  {
    id: 1,
    name: "Nginx Reverse Proxy",
    status: "Healthy",
    uptime: "99.98%",
  },
  {
    id: 2,
    name: "Backend API",
    status: "Healthy",
    uptime: "99.95%",
  },
  {
    id: 3,
    name: "Database Cluster",
    status: "Warning",
    uptime: "98.72%",
  },
  {
    id: 4,
    name: "Authentication Service",
    status: "Critical",
    uptime: "94.21%",
  },
  {
    id: 5,
    name: "Redis Cache",
    status: "Healthy",
    uptime: "99.91%",
  },
];

router.get("/", (req, res) => {
  res.json(services);
});

module.exports = router;