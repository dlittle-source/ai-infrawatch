import { mockDeployments } from "@/data/mockDeployments";

export default function DeploymentHistoryPanel() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-lg">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Deployment History
          </h2>
          <p className="text-sm text-slate-400">
            Recent CI/CD releases deployed to production infrastructure.
          </p>
        </div>

        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
          Production Stable
        </span>
      </div>

      <div className="space-y-4">
        {mockDeployments.map((deployment) => (
          <div
            key={deployment.id}
            className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 transition hover:border-emerald-500/40 hover:bg-slate-900"
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white">
                  {deployment.commitMessage}
                </p>
                <p className="text-xs text-slate-500">{deployment.timestamp}</p>
              </div>

              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                {deployment.status}
              </span>
            </div>

            <div className="grid gap-3 text-sm text-slate-300 md:grid-cols-3">
              <div>
                <p className="text-xs uppercase text-slate-500">Pipeline</p>
                <p>{deployment.pipeline}</p>
              </div>

              <div>
                <p className="text-xs uppercase text-slate-500">Target</p>
                <p>{deployment.target}</p>
              </div>

              <div>
                <p className="text-xs uppercase text-slate-500">
                  Health Check
                </p>
                <p className="text-emerald-400">{deployment.healthCheck}</p>
              </div>

              <div>
                <p className="text-xs uppercase text-slate-500">Branch</p>
                <p>{deployment.branch}</p>
              </div>

              <div>
                <p className="text-xs uppercase text-slate-500">
                  Environment
                </p>
                <p>{deployment.environment}</p>
              </div>

              <div>
                <p className="text-xs uppercase text-slate-500">Rollback</p>
                <p>{deployment.rollback}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}