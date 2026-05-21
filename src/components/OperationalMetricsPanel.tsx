const metrics = [
  { label: "API Latency", value: "42ms", detail: "Avg response time" },
  { label: "Deployment Success", value: "100%", detail: "Last 5 releases" },
  { label: "Active Containers", value: "3", detail: "Frontend, backend, nginx" },
  { label: "WebSocket Streams", value: "Active", detail: "Live telemetry channel" },
  { label: "CPU Utilization", value: "37%", detail: "Simulated EC2 load" },
  { label: "Memory Usage", value: "61%", detail: "Container memory profile" },
  { label: "Requests / Min", value: "128", detail: "Traffic throughput" },
  { label: "Availability", value: "99.9%", detail: "Production uptime target" },
];

export default function OperationalMetricsPanel() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Operational Metrics
          </h2>
          <p className="text-sm text-slate-400">
            Simulated production observability signals for infrastructure health.
          </p>
        </div>

        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
          Monitoring Active
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 transition hover:border-emerald-500/40 hover:bg-slate-900"
          >
            <p className="text-xs uppercase tracking-wide text-slate-500">
              {metric.label}
            </p>

            <h3 className="mt-3 text-2xl font-bold text-white">
              {metric.value}
            </h3>

            <p className="mt-2 text-sm text-slate-400">{metric.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}