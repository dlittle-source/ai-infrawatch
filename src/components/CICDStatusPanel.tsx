const pipelineSteps = [
  {
    name: "GitHub Push",
    detail: "Code pushed to main branch",
    status: "Completed",
  },
  {
    name: "GitHub Actions",
    detail: "CI/CD workflow triggered automatically",
    status: "Passed",
  },
  {
    name: "Docker Build",
    detail: "Frontend and backend images rebuilt",
    status: "Passed",
  },
  {
    name: "EC2 Deployment",
    detail: "Containers deployed to AWS EC2",
    status: "Successful",
  },
  {
    name: "Nginx Routing",
    detail: "Reverse proxy routes traffic to services",
    status: "Healthy",
  },
  {
    name: "Health Validation",
    detail: "Production API health check passed",
    status: "Passed",
  },
];

export default function CICDStatusPanel() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            CI/CD Pipeline Status
          </h2>
          <p className="text-sm text-slate-400">
            Automated deployment flow from GitHub Actions to AWS EC2 production.
          </p>
        </div>

        <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
          Pipeline Healthy
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {pipelineSteps.map((step, index) => (
          <div
            key={step.name}
            className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 transition hover:border-cyan-500/40 hover:bg-slate-900"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500/10 text-sm font-bold text-cyan-300">
                {index + 1}
              </div>

              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                {step.status}
              </span>
            </div>

            <h3 className="text-sm font-semibold text-white">{step.name}</h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              {step.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}