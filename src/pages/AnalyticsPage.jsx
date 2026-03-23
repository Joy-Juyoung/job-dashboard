import StatCard from "../components/jobs/StatCard";

function AnalyticsPage({ jobList, dashboardStats }) {
  const appliedCount = jobList.filter((job) => job.status === "Applied").length;
  const interviewCount = jobList.filter(
    (job) => job.status === "Interview",
  ).length;
  const offerCount = jobList.filter((job) => job.status === "Offer").length;
  const rejectedCount = jobList.filter(
    (job) => job.status === "Rejected",
  ).length;

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-gray-500">Insights Overview</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
          Analytics
        </h1>
        <p className="mt-3 text-sm text-gray-600">
          Review your application outcomes and current job search progress.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {dashboardStats.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            description={stat.description}
          />
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Status Breakdown
          </h2>

          <div className="mt-4 space-y-3 text-sm text-gray-600">
            <div className="flex items-center justify-between">
              <span>Applied</span>
              <span className="font-medium text-gray-900">{appliedCount}</span>
            </div>

            <div className="flex items-center justify-between">
              <span>Interview</span>
              <span className="font-medium text-gray-900">
                {interviewCount}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span>Offer</span>
              <span className="font-medium text-gray-900">{offerCount}</span>
            </div>

            <div className="flex items-center justify-between">
              <span>Rejected</span>
              <span className="font-medium text-gray-900">{rejectedCount}</span>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-dashed bg-gray-50 p-6 text-sm text-gray-500 shadow-sm">
          More analytics visualizations can be added here later, such as charts
          for application trends, response ratios, and status distribution.
        </article>
      </section>
    </div>
  );
}

export default AnalyticsPage;
