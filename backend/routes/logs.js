const express = require("express");
const router = express.Router();

const possibleLogs = [
  { level: "INFO", message: "Backend API health check passed" },
  { level: "INFO", message: "Container health validation completed" },
  { level: "INFO", message: "CPU utilization stabilized below threshold" },
  { level: "INFO", message: "GitHub Actions deployment completed successfully" },
  { level: "INFO", message: "Nginx upstream connection restored" },
  { level: "WARN", message: "Database latency increased to 280ms" },
  { level: "WARN", message: "Elevated memory usage detected on backend service" },
  { level: "WARN", message: "Database replication lag increasing" },
  { level: "ERROR", message: "Authentication timeout detected" },
  { level: "ERROR", message: "Failed authentication request spike detected" },
  { level: "ERROR", message: "Reverse proxy timeout exceeded threshold" },
];

let logs = [
  {
    id: 1,
    level: "INFO",
    message: "Backend API health check passed",
    time: "11:42:01",
  },
  {
    id: 2,
    level: "WARN",
    message: "Database latency increased to 280ms",
    time: "11:42:08",
  },
  {
    id: 3,
    level: "ERROR",
    message: "Authentication timeout detected",
    time: "11:42:14",
  },
  {
    id: 4,
    level: "INFO",
    message: "Nginx reverse proxy recovered successfully",
    time: "11:42:19",
  },
];

router.get("/", (req, res) => {
  const randomLog =
    possibleLogs[Math.floor(Math.random() * possibleLogs.length)];

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour12: false,
  });

  const newLog = {
    id: Date.now(),
    level: randomLog.level,
    message: randomLog.message,
    time: currentTime,
  };

  logs = [newLog, ...logs].slice(0, 8);

  res.json(logs);
});

module.exports = router;