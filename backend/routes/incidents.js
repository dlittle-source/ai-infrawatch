const express = require("express");
const router = express.Router();

const incidents = [
  {
    id: 1,
    title: "Authentication API experiencing elevated latency",
    severity: "Critical",
    time: "5 minutes ago",
    impact: "Authentication requests failing intermittently",
    rootCause:
      "Reverse proxy timeout configuration too low under elevated backend load.",
    remediation: [
      "Inspect Nginx timeout configuration",
      "Validate backend container health",
      "Review recent deployment changes",
      "Monitor authentication request volume",
    ],
    impactedServices: [
      "Authentication Service",
      "Backend API",
      "Nginx Reverse Proxy",
    ],
  },
  {
    id: 2,
    title: "Database replication delay detected",
    severity: "Warning",
    time: "18 minutes ago",
    impact: "Potential delayed data synchronization",
    rootCause: "Replication worker experiencing increased disk I/O latency.",
    remediation: [
      "Inspect replication queue depth",
      "Review disk utilization metrics",
      "Validate storage throughput",
    ],
    impactedServices: ["Database Cluster"],
  },
  {
    id: 3,
    title: "Nginx reverse proxy restarted successfully",
    severity: "Resolved",
    time: "42 minutes ago",
    impact: "Temporary request interruption resolved",
    rootCause:
      "Container restart completed after failed upstream connection recovery.",
    remediation: [
      "Continue monitoring upstream health",
      "Validate reverse proxy stability",
    ],
    impactedServices: ["Nginx Reverse Proxy"],
  },
];

router.get("/", (req, res) => {
  res.json(incidents);
});

module.exports = router;