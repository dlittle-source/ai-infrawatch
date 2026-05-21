const timelineEvents = [
  {
    time: "08:42 PM",
    title: "Production deployment completed",
    detail: "GitHub Actions successfully deployed the latest build to AWS EC2.",
    status: "Success",
  },
  {
    time: "08:43 PM",
    title: "Health checks validated",
    detail: "Backend API and frontend routes responded successfully.",
    status: "Passed",
  },
  {
    time: "08:44 PM",
    title: "Containers restarted successfully",
    detail: "Docker restart policies confirmed all services recovered cleanly.",
    status: "Stable",
  },
  {
    time: "08:45 PM",
    title: "Nginx upstream routing confirmed",
    detail: "Reverse proxy routing verified for frontend, backend, and API routes.",
    status: "Healthy",
  },
  {
    time: "08:46 PM",
    title: "WebSocket telemetry active",
    detail: "Live infrastructure event stream confirmed operational.",
    status: "Active",
  },
];

export default function DeploymentTimelinePanel() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Deployment Timeline
          </h2>
          <p className="text-sm text-slate-400">
            Production release events from deployment through validation.
          </p>
        </div>

        <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
          Release Verified
        </span>
      </div>

      <div className="space-y-4">
        {timelineEvents.map((event, index) => (
          <div key={event.title} className="relative flex gap-4">
            <div className="flex flex-col items-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 text-sm font-bold text-blue-300">
                {index + 1}
              </div>

              {index < timelineEvents.length - 1 && (
                <div className="mt-2 h-full w-px bg-slate-800"></div>
              )}
            </div>

            <div className="flex-1 rounded-xl border border-slate-800 bg-slate-900/70 p-4 transition hover:border-blue-500/40 hover:bg-slate-900">
              <div className="mb-2 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {event.title}
                  </p>
                  <p className="text-xs text-slate-500">{event.time}</p>
                </div>

                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                  {event.status}
                </span>
              </div>

              <p className="text-sm leading-6 text-slate-400">
                {event.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}