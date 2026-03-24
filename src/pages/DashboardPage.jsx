import { useState } from "react";
import AddJobForm from "../components/jobs/AddJobForm";
import StatCard from "../components/jobs/StatCard";
import RecentApplicationsSection from "../components/dashboard/RecentApplicationsSection";

function DashboardPage({ jobList, dashboardStats, onAddJob }) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const recentJobs = jobList.slice(0, 6);

  function handleCloseForm() {
    setIsFormOpen(false);
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-gray-500">
              Frontend Job Search Tracker
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
              Job Dashboard
            </h1>
            <p className="mt-3 text-sm text-gray-600">
              Get a quick overview of your job search progress, recent
              applications, and key outcomes.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsFormOpen(true)}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Add New Job
          </button>
        </div>
      </section>

      {isFormOpen && (
        <AddJobForm
          key="dashboard-new-job"
          onAddJob={onAddJob}
          onUpdateJob={() => {}}
          onClose={handleCloseForm}
          editingJob={null}
        />
      )}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            description={stat.description}
          />
        ))}
      </section>

      <RecentApplicationsSection recentJobs={recentJobs} />
    </div>
  );
}

export default DashboardPage;
