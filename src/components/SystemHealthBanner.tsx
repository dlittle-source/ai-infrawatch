export default function SystemHealthBanner() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-zinc-900 p-6 shadow-2xl">
      <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-emerald-500/20 blur-3xl"></div>

      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="relative flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-400"></span>
            </span>

            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
              All Systems Operational
            </span>
          </div>

          <h2 className="text-2xl font-bold text-white">
            Production infrastructure is healthy and deployment validated.
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
            AI InfraWatch is actively monitoring container health, backend API
            availability, Nginx routing, CI/CD deployment status, and live
            infrastructure telemetry.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[420px]">
          <div className="rounded-xl border border-emerald-500/20 bg-slate-950/70 p-4">
            <p className="text-xs uppercase text-slate-500">API Health</p>
            <p className="mt-2 text-sm font-semibold text-emerald-300">
              Passing
            </p>
          </div>

          <div className="rounded-xl border border-cyan-500/20 bg-slate-950/70 p-4">
            <p className="text-xs uppercase text-slate-500">Deployment</p>
            <p className="mt-2 text-sm font-semibold text-cyan-300">
              Validated
            </p>
          </div>

          <div className="rounded-xl border border-purple-500/20 bg-slate-950/70 p-4">
            <p className="text-xs uppercase text-slate-500">Monitoring</p>
            <p className="mt-2 text-sm font-semibold text-purple-300">
              Active
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}