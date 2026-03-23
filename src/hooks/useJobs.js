import { useEffect, useMemo, useState } from "react";
import initialJobs from "../data/jobs";

function useJobs() {
  const [jobList, setJobList] = useState(() => {
    const savedJobs = localStorage.getItem("jobs");

    if (savedJobs) {
      return JSON.parse(savedJobs);
    }

    return initialJobs;
  });

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobList));
  }, [jobList]);

  function addJob(newJob) {
    setJobList((prev) => [newJob, ...prev]);
  }

  function updateJob(updatedJob) {
    setJobList((prev) =>
      prev.map((job) => (job.id === updatedJob.id ? updatedJob : job)),
    );
  }

  function deleteJob(jobId) {
    setJobList((prev) => prev.filter((job) => job.id !== jobId));
  }

  const dashboardStats = useMemo(() => {
    const totalApplications = jobList.length;

    const interviews = jobList.filter(
      (job) => job.status === "Interview",
    ).length;

    const offers = jobList.filter((job) => job.status === "Offer").length;

    const responseStatuses = ["Interview", "Offer", "Rejected"];

    const responses = jobList.filter((job) =>
      responseStatuses.includes(job.status),
    ).length;

    const responseRate =
      totalApplications === 0
        ? "0%"
        : `${Math.round((responses / totalApplications) * 100)}%`;

    return [
      {
        id: 1,
        label: "Applications Sent",
        value: totalApplications,
        description: "Total applications submitted",
      },
      {
        id: 2,
        label: "Interviews",
        value: interviews,
        description: "Interview stages in progress",
      },
      {
        id: 3,
        label: "Offers",
        value: offers,
        description: "Current offers received",
      },
      {
        id: 4,
        label: "Response Rate",
        value: responseRate,
        description: "Replies from submitted applications",
      },
    ];
  }, [jobList]);

  return {
    jobList,
    dashboardStats,
    addJob,
    updateJob,
    deleteJob,
  };
}

export default useJobs;
