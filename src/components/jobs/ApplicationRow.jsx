import JobSummary from "./JobSummary";
import StatusBadge from "./StatusBadge";
import JobItemActions from "./JobItemActions";
import getJobSecondaryLabel from "../../utils/getJobSecondaryLabel";

function ApplicationRow({ job, onEdit, onDelete, searchTerm = "" }) {
  if (!job) return null;

  const secondaryLabel = getJobSecondaryLabel(job);

  return (
    <article className="rounded-2xl border border-gray-200 bg-white px-5 py-4 transition-shadow duration-200 hover:shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <JobSummary
          company={job.company}
          position={job.position}
          location={job.location}
          appliedDate={job.appliedDate}
          secondaryLabel={secondaryLabel}
          notes={job.notes}
          searchTerm={searchTerm}
        />

        <div className="flex items-center gap-3">
          <StatusBadge status={job.status} />

          <JobItemActions
            job={job}
            onEdit={onEdit}
            onDelete={onDelete}
            variant="icon"
          />
        </div>
      </div>
    </article>
  );
}

export default ApplicationRow;
