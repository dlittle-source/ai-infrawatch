"use client";

import { useEffect, useMemo, useState } from "react";

type Service = {
  id: number;
  name: string;
  status: string;
  uptime: string;
};

type Incident = {
  id: number;
  title: string;
  severity: string;
  time: string;
  impact: string;
  rootCause: string;
  remediation: string[];
  impactedServices: string[];
};

type LogEntry = {
  id?: number;
  level: string;
  message: string;
  time: string;
};

function normalizeArray<T>(data: unknown, key: string): T[] {
  if (Array.isArray(data)) return data as T[];

  if (
    data &&
    typeof data === "object" &&
    key in data &&
    Array.isArray((data as Record<string, unknown>)[key])
  ) {
    return (data as Record<string, T[]>)[key];
  }

  return [];
}

export default function Home() {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [secondsAgo, setSecondsAgo] = useState(0);
  const [selectedIncident, setSelectedIncident] = useState<number | null>(0);

  const [services, setServices] = useState<Service[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    async function fetchDashboardData(showLoading = false) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);

      try {
        if (showLoading) setLoading(true);

        setApiError("");

        const [servicesRes, incidentsRes, logsRes] = await Promise.all([
          fetch("/api/services", { signal: controller.signal }),
          fetch("/api/incidents", { signal: controller.signal }),
          fetch("/api/logs", { signal: controller.signal }),
        ]);

        if (!servicesRes.ok || !incidentsRes.ok || !logsRes.ok) {
          throw new Error("One or more API requests failed");
        }

        const servicesData = await servicesRes.json();
        const incidentsData = await incidentsRes.json();
        const logsData = await logsRes.json();

        console.log("servicesData:", servicesData);
        console.log("incidentsData:", incidentsData);
        console.log("logsData:", logsData);

        setServices(normalizeArray<Service>(servicesData, "services"));
        setIncidents(normalizeArray<Incident>(incidentsData, "incidents"));
        setLogs(normalizeArray<LogEntry>(logsData, "logs"));
        setSecondsAgo(0);
      } catch (error) {
        console.error(error);
        setApiError(
          "Unable to connect to the AI InfraWatch backend API through Nginx."
        );
      } finally {
        clearTimeout(timeout);
        setLoading(false);
      }
    }

    fetchDashboardData(true);

    const dataRefreshInterval = setInterval(() => {
      fetchDashboardData(false);
    }, 15000);

    return () => clearInterval(dataRefreshInterval);
  }, []);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      setSecondsAgo((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(refreshInterval);
  }, []);

  const filteredServices =
    selectedStatus === "All"
      ? services
      : services.filter((service) => service.status === selectedStatus);

  const healthyCount = useMemo(
    () => services.filter((service) => service.status === "Healthy").length,
    [services]
  );

  const warningCount = useMemo(
    () => services.filter((service) => service.status === "Warning").length,
    [services]
  );

  const criticalCount = useMemo(
    () => services.filter((service) => service.status === "Critical").length,
    [services]
  );

  const activeIncident =
    selectedIncident !== null ? incidents[selectedIncident] : null;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800 bg-zinc-900">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              AI InfraWatch
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              AI-Powered Infrastructure Monitoring & Incident Response Platform
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-zinc-400">
              Last refreshed:{" "}
              <span className="font-medium text-zinc-200">
                {secondsAgo} seconds ago
              </span>
            </div>

            <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
              ● Backend Connected
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {loading && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-zinc-300 shadow-lg">
            Loading dashboard data from backend API...
          </div>
        )}

        {apiError && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-red-300 shadow-lg">
            {apiError}
          </div>
        )}

        {!loading && !apiError && (
          <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg">
                <p className="text-sm text-zinc-400">Healthy Services</p>
                <h2 className="mt-3 text-4xl font-bold text-emerald-400">
                  {healthyCount}
                </h2>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg">
                <p className="text-sm text-zinc-400">Warning Services</p>
                <h2 className="mt-3 text-4xl font-bold text-yellow-400">
                  {warningCount}
                </h2>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg">
                <p className="text-sm text-zinc-400">Critical Services</p>
                <h2 className="mt-3 text-4xl font-bold text-red-400">
                  {criticalCount}
                </h2>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    Infrastructure Services
                  </h2>

                  <select
                    value={selectedStatus}
                    onChange={(event) => setSelectedStatus(event.target.value)}
                    className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white"
                  >
                    <option value="All">All</option>
                    <option value="Healthy">Healthy</option>
                    <option value="Warning">Warning</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>

                <div className="space-y-4">
                  {filteredServices.map((service) => (
                    <div
                      key={service.id}
                      className="rounded-xl border border-zinc-800 bg-zinc-950 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{service.name}</h3>
                          <p className="mt-1 text-sm text-zinc-400">
                            Uptime: {service.uptime}
                          </p>
                        </div>

                        <div
                          className={`rounded-full px-3 py-1 text-sm font-medium ${
                            service.status === "Healthy"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : service.status === "Warning"
                                ? "bg-yellow-500/10 text-yellow-400"
                                : "bg-red-500/10 text-red-400"
                          }`}
                        >
                          {service.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/10 to-zinc-900 p-6 shadow-2xl">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">
                    AI Incident Analysis
                  </h2>

                  <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">
                    AI ACTIVE
                  </span>
                </div>

                <div className="space-y-5">
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
                    <p className="text-sm leading-7 text-zinc-300">
                      AI operational intelligence is connected to backend
                      incident and service telemetry. The system is ready for
                      production-style routing through Nginx.
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-zinc-400">
                      Backend Integration Status
                    </h3>

                    <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 text-sm text-zinc-300">
                      Services, incidents, and logs are being retrieved through
                      Nginx and routed to the Express API container.
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-zinc-400">
                      Suggested Immediate Action
                    </h3>

                    <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 text-sm text-zinc-300">
                      Continue validating container routing before moving into
                      CI/CD and cloud deployment.
                    </div>
                  </div>

                  <button className="mt-4 w-full rounded-xl bg-cyan-500 px-4 py-3 font-medium text-black transition hover:bg-cyan-400">
                    Generate Full Incident Report
                  </button>
                </div>
              </section>
            </div>

            <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">
                  Incident Investigation Center
                </h2>

                <div className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300">
                  {incidents.length} Incidents
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="space-y-4">
                  {incidents.map((incident, index) => (
                    <button
                      key={incident.id}
                      onClick={() => setSelectedIncident(index)}
                      className={`w-full rounded-xl border p-4 text-left transition ${
                        selectedIncident === index
                          ? "border-cyan-500 bg-cyan-500/10"
                          : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h3 className="font-medium">{incident.title}</h3>
                          <p className="mt-2 text-sm text-zinc-400">
                            {incident.time}
                          </p>
                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            incident.severity === "Critical"
                              ? "bg-red-500/10 text-red-400"
                              : incident.severity === "Warning"
                                ? "bg-yellow-500/10 text-yellow-400"
                                : "bg-emerald-500/10 text-emerald-400"
                          }`}
                        >
                          {incident.severity}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {activeIncident && (
                  <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/10 to-zinc-950 p-6">
                    <div className="mb-6 flex items-center justify-between">
                      <h3 className="text-2xl font-semibold">
                        Incident Analysis
                      </h3>

                      <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">
                        API Driven
                      </span>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="mb-2 text-sm font-semibold text-zinc-400">
                          Operational Impact
                        </h4>

                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-4 text-sm text-zinc-300">
                          {activeIncident.impact}
                        </div>
                      </div>

                      <div>
                        <h4 className="mb-2 text-sm font-semibold text-zinc-400">
                          Probable Root Cause
                        </h4>

                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-4 text-sm text-zinc-300">
                          {activeIncident.rootCause}
                        </div>
                      </div>

                      <div>
                        <h4 className="mb-3 text-sm font-semibold text-zinc-400">
                          Impacted Infrastructure
                        </h4>

                        <div className="flex flex-wrap gap-3">
                          {activeIncident.impactedServices.map(
                            (service, index) => (
                              <div
                                key={index}
                                className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-300"
                              >
                                {service}
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="mb-3 text-sm font-semibold text-zinc-400">
                          Recommended Remediation Workflow
                        </h4>

                        <div className="space-y-3">
                          {activeIncident.remediation.map((step, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900/70 p-4"
                            >
                              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500 font-semibold text-black">
                                {index + 1}
                              </div>

                              <p className="text-sm text-zinc-300">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">
                    Live Infrastructure Event Stream
                  </h2>

                  <p className="mt-1 text-sm text-zinc-400">
                    Logs loaded from backend API
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400"></span>
                  STREAM ACTIVE
                </div>
              </div>

              <div className="space-y-3">
                {logs.map((log, index) => (
                  <div
                    key={log.id ?? index}
                    className="flex items-start gap-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-sm"
                  >
                    <span className="text-zinc-500">{log.time}</span>

                    <span
                      className={`font-semibold ${
                        log.level === "INFO"
                          ? "text-emerald-400"
                          : log.level === "WARN" || log.level === "WARNING"
                            ? "text-yellow-400"
                            : "text-red-400"
                      }`}
                    >
                      [{log.level}]
                    </span>

                    <span className="text-zinc-300">{log.message}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}