const express = require("express");
const cors = require("cors");

const servicesRoutes = require("./routes/services");
const incidentsRoutes = require("./routes/incidents");
const logsRoutes = require("./routes/logs");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "AI InfraWatch Backend API is running",
    status: "healthy",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    service: "ai-infrawatch-backend",
  });
});

app.use("/api/services", servicesRoutes);
app.use("/api/incidents", incidentsRoutes);
app.use("/api/logs", logsRoutes);

app.listen(PORT, () => {
  console.log(`AI InfraWatch backend running on port ${PORT}`);
});