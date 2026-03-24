import { useMemo } from "react";

function useRecentJobs(jobList, limit = 4) {
  return useMemo(() => {
    return [...jobList]
      .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
      .slice(0, limit);
  }, [jobList, limit]);
}

export default useRecentJobs;
