import { useMemo, useState } from "react";

function getLatestRelevantDate(job) {
  return (
    job.rejectedDate ||
    job.offerDate ||
    job.interviewDate ||
    job.appliedDate ||
    ""
  );
}

function useApplicationFilters(jobList) {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("latest-activity");

  const filterOptions = ["All", "Applied", "Interview", "Offer", "Rejected"];

  const filteredJobs = useMemo(() => {
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();

    const result = jobList.filter((job) => {
      const matchesStatus =
        selectedStatus === "All" || job.status === selectedStatus;

      const matchesSearch =
        normalizedSearchTerm === "" ||
        job.company.toLowerCase().includes(normalizedSearchTerm) ||
        job.position.toLowerCase().includes(normalizedSearchTerm) ||
        job.location.toLowerCase().includes(normalizedSearchTerm) ||
        job.notes?.toLowerCase().includes(normalizedSearchTerm);

      return matchesStatus && matchesSearch;
    });

    return [...result].sort((a, b) => {
      if (sortOption === "newest-applied") {
        return new Date(b.appliedDate) - new Date(a.appliedDate);
      }

      if (sortOption === "oldest-applied") {
        return new Date(a.appliedDate) - new Date(b.appliedDate);
      }

      return (
        new Date(getLatestRelevantDate(b)) - new Date(getLatestRelevantDate(a))
      );
    });
  }, [jobList, searchTerm, selectedStatus, sortOption]);

  function resetFilters() {
    setSelectedStatus("All");
    setSearchTerm("");
    setSortOption("latest-activity");
  }

  return {
    selectedStatus,
    setSelectedStatus,
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    filterOptions,
    filteredJobs,
    totalVisibleJobs: filteredJobs.length,
    resetFilters,
  };
}

export default useApplicationFilters;
