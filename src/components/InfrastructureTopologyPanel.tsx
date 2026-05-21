const topologySteps = [
  {
    title: "GitHub Actions",
    description: "Automated CI/CD workflow triggered from the main branch.",
  },
  {
    title: "Docker Build",
    description: "Frontend and backend containers are rebuilt for deployment.",
  },
  {
    title: "AWS EC2",
    description: "Production host running the containerized application stack.",
  },
  {
    title: "Nginx Reverse Proxy",
    description: "Routes traffic to the frontend and backend API services.",
  },
  {
    title: "AI InfraWatch App",
    description: "Next.js dashboard connected to Node.js backend telemetry.",
  },
];

export default function InfrastructureTopologyPanel() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Infrastructure Topology
          </h2>
          <p className="text-sm text-slate-400">
            Production deployment architecture from source control to live
            observability dashboard.
          </p>
        </div>

        <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
          Architecture View
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        {topologySteps.map((step, index) => (
          <div key={step.title} className="relative">
            <div className="h-full rounded-xl border border-slate-800 bg-slate-900/70 p-4 transition hover:border-purple-500/40 hover:bg-slate-900">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10 text-sm font-bold text-purple-300">
                {index + 1}
              </div>

              <h3 className="text-sm font-semibold text-white">
                {step.title}
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                {step.description}
              </p>
            </div>

            {index < topologySteps.length - 1 && (
              <div className="hidden md:block absolute right-[-18px] top-1/2 z-10 -translate-y-1/2 text-purple-400">
                →
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}