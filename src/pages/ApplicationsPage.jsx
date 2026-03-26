import { useEffect, useRef, useState } from "react";
import AddJobForm from "../components/jobs/form/AddJobForm";
import ApplicationRow from "../components/jobs/ApplicationRow";
import ApplicationsControls from "../components/jobs/ApplicationsControls";
import useApplicationFilters from "../hooks/useApplicationFilters";

function ApplicationsPage({ jobList, onAddJob, onUpdateJob, onDeleteJob }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const formSectionRef = useRef(null);

  const {
    selectedStatus,
    setSelectedStatus,
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    filterOptions,
    filteredJobs,
    totalVisibleJobs,
    resetFilters,
  } = useApplicationFilters(jobList);

  useEffect(() => {
    if (isFormOpen && formSectionRef.current) {
      formSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isFormOpen, editingJob]);

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

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Applications
            </h1>
            <p className="mt-3 text-sm text-gray-600">
              Manage your full job application list.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setEditingJob(null);
              setIsFormOpen(true);
            }}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-gray-800"
          >
            Add New Job
          </button>
        </div>
      </section>

      {isFormOpen && (
        <div ref={formSectionRef} className="scroll-mt-24">
          <AddJobForm
            key={editingJob ? editingJob.id : "new-job"}
            onAddJob={handleSubmitNewJob}
            onUpdateJob={handleSubmitUpdatedJob}
            onClose={handleCloseForm}
            editingJob={editingJob}
          />
        </div>
      )}

      <section className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <ApplicationsControls
          totalVisibleJobs={totalVisibleJobs}
          filterOptions={filterOptions}
          selectedStatus={selectedStatus}
          onSelectStatus={setSelectedStatus}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClearSearch={() => setSearchTerm("")}
          onResetFilters={resetFilters}
          sortOption={sortOption}
          onSortChange={setSortOption}
        />

        {filteredJobs.length > 0 ? (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <ApplicationRow
                key={job.id}
                job={job}
                onDelete={handleDelete}
                onEdit={handleStartEdit}
                searchTerm={searchTerm}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center text-sm text-gray-500">
            No applications match your current filters.
          </div>
        )}
      </section>
    </div>
  );
}

export default ApplicationsPage;
