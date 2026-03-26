import StatusBadge from "./StatusBadge";
import JobSummary from "./JobSummary";
import JobItemActions from "./JobItemActions";
import getJobSecondaryLabel from "../../utils/getJobSecondaryLabel";

function JobCard({ job, onDelete, onEdit, showActions = true }) {
  const secondaryLabel = getJobSecondaryLabel(job);

  return (
    <article className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex h-full items-start justify-between gap-4">
        <JobSummary
          company={job.company}
          position={job.position}
          location={job.location}
          appliedDate={job.appliedDate}
          secondaryLabel={secondaryLabel}
          notes={job.notes}
        />

        <div className="flex shrink-0 flex-col items-end gap-3 self-start">
          <StatusBadge status={job.status} />

          {showActions && (
            <JobItemActions
              job={job}
              onEdit={onEdit}
              onDelete={onDelete}
              variant="button"
            />
          )}
        </div>
      </div>
    </article>
  );
}

export default JobCard;
