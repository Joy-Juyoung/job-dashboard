import StatusFilter from "./StatusFilter";

function ApplicationsControls({
  totalVisibleJobs,
  filterOptions,
  selectedStatus,
  onSelectStatus,
  searchTerm,
  onSearchChange,
  onClearSearch,
  onResetFilters,
  sortOption,
  onSortChange,
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Application List
          </h2>
          <p className="text-sm text-gray-500">
            {totalVisibleJobs} application{totalVisibleJobs !== 1 ? "s" : ""}{" "}
            found
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <label
              htmlFor="sort-applications"
              className="text-sm font-medium text-gray-600"
            >
              Sort
            </label>

            <select
              id="sort-applications"
              value={sortOption}
              onChange={(event) => onSortChange(event.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-gray-400"
            >
              <option value="latest-activity">Latest Activity</option>
              <option value="newest-applied">Newest Applied</option>
              <option value="oldest-applied">Oldest Applied</option>
            </select>
          </div>

          <button
            type="button"
            onClick={onResetFilters}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <StatusFilter
          options={filterOptions}
          selectedStatus={selectedStatus}
          onSelect={onSelectStatus}
        />

        <div className="flex w-full max-w-md items-center gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by company or position"
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-gray-400"
          />

          {searchTerm && (
            <button
              type="button"
              onClick={onClearSearch}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ApplicationsControls;
