import { formatDate } from "../../utils/formatDate";
import highlightText from "../../utils/highlightText.jsx";

function JobSummary({
  company,
  position,
  location,
  appliedDate,
  secondaryLabel,
  compact = false,
  notes,
  searchTerm = "",
}) {
  return (
    <div className="min-w-0 flex-1">
      <p className="text-sm font-medium text-gray-500">
        {highlightText(company, searchTerm)}
      </p>

      <h3
        className={`truncate font-semibold text-gray-900 ${
          compact ? "mt-1 text-lg" : "mt-1 text-lg"
        }`}
      >
        {highlightText(position, searchTerm)}
      </h3>

      <div className="mt-1 flex flex-col gap-1 text-sm text-gray-500">
        <span>{highlightText(location, searchTerm)}</span>

        {(appliedDate || secondaryLabel) && (
          <div className="flex flex-wrap items-center gap-3">
            {appliedDate && (
              <span className="whitespace-nowrap">
                Applied: {formatDate(appliedDate)}
              </span>
            )}

            {secondaryLabel && (
              <span className="whitespace-nowrap">{secondaryLabel}</span>
            )}
          </div>
        )}

        {notes && (
          <p className="mt-2 line-clamp-2 text-sm text-gray-500">
            {highlightText(notes, searchTerm)}
          </p>
        )}
      </div>
    </div>
  );
}

export default JobSummary;
