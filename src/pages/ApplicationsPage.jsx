import { useMemo, useState } from "react";
import AddJobForm from "../components/jobs/AddJobForm";
import JobCard from "../components/jobs/JobCard";
import StatusFilter from "../components/jobs/StatusFilter";

function ApplicationsPage({ jobList, onAddJob, onUpdateJob, onDeleteJob }) {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const filterOptions = ["All", "Applied", "Interview", "Offer", "Rejected"];

  function handleResetFilters() {
    setSelectedStatus("All");
    setSearchTerm("");
  }

  function handleStartEdit(job) {
    setEditingJob(job);
    setIsFormOpen(true);
  }

  function handleCloseForm() {
    setIsFormOpen(false);
    setEditingJob(null);
  }

  function handleSubmitNewJob(newJob) {
    onAddJob(newJob);
  }

  function handleSubmitUpdatedJob(updatedJob) {
    onUpdateJob(updatedJob);
    setEditingJob(null);
  }

  function handleDelete(jobId) {
    onDeleteJob(jobId);

    if (editingJob && editingJob.id === jobId) {
      setEditingJob(null);
      setIsFormOpen(false);
    }
  }

  const filteredJobs = useMemo(() => {
    return jobList.filter((job) => {
      const matchesStatus =
        selectedStatus === "All" || job.status === selectedStatus;

      const normalizedSearchTerm = searchTerm.toLowerCase().trim();

      const matchesSearch =
        job.company.toLowerCase().includes(normalizedSearchTerm) ||
        job.position.toLowerCase().includes(normalizedSearchTerm);

      return matchesStatus && matchesSearch;
    });
  }, [jobList, selectedStatus, searchTerm]);

  const totalVisibleJobs = filteredJobs.length;

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Application Management
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
              Applications
            </h1>
            <p className="mt-3 text-sm text-gray-600">
              Manage your full job application list with filters, search, edit,
              and delete actions.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              if (isFormOpen && !editingJob) {
                handleCloseForm();
                return;
              }

              setEditingJob(null);
              setIsFormOpen((prev) => !prev);
            }}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            {isFormOpen && !editingJob ? "Close Form" : "Add New Job"}
          </button>
        </div>
      </section>

      {isFormOpen && (
        <AddJobForm
          onAddJob={handleSubmitNewJob}
          onUpdateJob={handleSubmitUpdatedJob}
          onClose={handleCloseForm}
          editingJob={editingJob}
        />
      )}

      <section className="space-y-4 rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                All Applications
              </h2>
              <p className="text-sm text-gray-500">
                Showing {totalVisibleJobs} application
                {totalVisibleJobs === 1 ? "" : "s"}
              </p>
            </div>

            <StatusFilter
              options={filterOptions}
              selectedStatus={selectedStatus}
              onSelect={setSelectedStatus}
            />
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <input
              type="text"
              placeholder="Search by company or position"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-400"
            />

            <div className="flex gap-2">
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="rounded-lg border bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                >
                  Clear Search
                </button>
              )}

              <button
                type="button"
                onClick={handleResetFilters}
                className="rounded-lg border bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {filteredJobs.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                id={job.id}
                company={job.company}
                position={job.position}
                status={job.status}
                location={job.location}
                onDelete={handleDelete}
                onEdit={handleStartEdit}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed bg-gray-50 p-8 text-center text-sm text-gray-500">
            No applications match your current filters.
          </div>
        )}
      </section>
    </div>
  );
}

export default ApplicationsPage;
