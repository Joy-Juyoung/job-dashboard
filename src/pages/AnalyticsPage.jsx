import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { formatDate } from "../utils/formatDate";

function AnalyticsPage({ analyticsSummary }) {
  const {
    totalApplications,
    pendingCount,
    interviewCount,
    offerCount,
    rejectedCount,
    responses,
    responseRate,
    latestAppliedDate,
    latestInterviewDate,
    latestOfferDate,
  } = analyticsSummary;

  const statusChartData = [
    { name: "Pending", value: pendingCount },
    { name: "Interview", value: interviewCount },
    { name: "Offer", value: offerCount },
    { name: "Rejected", value: rejectedCount },
  ];

  const chartColors = ["#d1d5db", "#fde68a", "#86efac", "#fca5a5"];

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-gray-500">Insights Overview</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
          Analytics
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-gray-600">
          Review your application outcomes, response trends, and current status
          distribution across the job search pipeline.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Total Applications
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            {totalApplications}
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Total number of job applications currently tracked
          </p>
        </article>

        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Response Rate</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            {responseRate}
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Based on interview, offer, and rejected outcomes
          </p>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Status Distribution
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Current breakdown of tracked applications by status
          </p>

          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusChartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={3}
                >
                  {statusChartData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={chartColors[index % chartColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Status Breakdown
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Detailed count of each application state
          </p>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
              <span className="text-sm text-gray-600">Pending</span>
              <span className="text-sm font-semibold text-gray-900">
                {pendingCount}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
              <span className="text-sm text-gray-600">Interview</span>
              <span className="text-sm font-semibold text-gray-900">
                {interviewCount}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
              <span className="text-sm text-gray-600">Offer</span>
              <span className="text-sm font-semibold text-gray-900">
                {offerCount}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
              <span className="text-sm text-gray-600">Rejected</span>
              <span className="text-sm font-semibold text-gray-900">
                {rejectedCount}
              </span>
            </div>
          </div>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Response Insight
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Applications that have moved beyond the pending stage
          </p>

          <div className="mt-6 flex items-end justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Applications with response
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                {responses}
              </p>
            </div>

            <div className="rounded-xl bg-gray-900 px-4 py-3 text-right">
              <p className="text-xs uppercase tracking-wide text-gray-300">
                Response Rate
              </p>
              <p className="mt-1 text-lg font-semibold text-white">
                {responseRate}
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Timeline Highlights
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Recent milestone dates from your application activity
          </p>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
              <span className="text-sm text-gray-600">Latest Application</span>
              <span className="text-sm font-semibold text-gray-900">
                {latestAppliedDate ? formatDate(latestAppliedDate) : "—"}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
              <span className="text-sm text-gray-600">Latest Interview</span>
              <span className="text-sm font-semibold text-gray-900">
                {latestInterviewDate ? formatDate(latestInterviewDate) : "—"}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
              <span className="text-sm text-gray-600">Latest Offer</span>
              <span className="text-sm font-semibold text-gray-900">
                {latestOfferDate ? formatDate(latestOfferDate) : "—"}
              </span>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}

export default AnalyticsPage;
