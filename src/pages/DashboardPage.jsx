import { Link } from "react-router-dom";
import AddJobForm from "../components/jobs/AddJobForm";
import JobCard from "../components/jobs/JobCard";
import StatCard from "../components/jobs/StatCard";
import { useState } from "react";

function DashboardPage({ jobList, dashboardStats, onAddJob }) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const recentJobs = jobList.slice(0, 4);

  function handleCloseForm() {
    setIsFormOpen(false);
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border bg-white p-6 shadow-sm">
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
            onClick={() => setIsFormOpen((prev) => !prev)}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            {isFormOpen ? "Close Form" : "Add New Job"}
          </button>
        </div>
      </section>

      {isFormOpen && (
        <AddJobForm
          onAddJob={onAddJob}
          onUpdateJob={() => {}}
          onClose={handleCloseForm}
          editingJob={null}
        />
      )}

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

      <section className="space-y-4 rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Applications
            </h2>
            <p className="text-sm text-gray-500">
              Showing the 4 most recent job applications
            </p>
          </div>

          <Link
            to="/applications"
            className="text-sm font-medium text-gray-700 underline-offset-4 hover:underline"
          >
            Go to Applications
          </Link>
        </div>

        {recentJobs.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {recentJobs.map((job) => (
              <JobCard
                key={job.id}
                id={job.id}
                company={job.company}
                position={job.position}
                status={job.status}
                location={job.location}
                showActions={false}
                // onDelete={() => {}}
                // onEdit={() => {}}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed bg-gray-50 p-8 text-center text-sm text-gray-500">
            No recent applications yet.
          </div>
        )}
      </section>
    </div>
  );
}

export default DashboardPage;
