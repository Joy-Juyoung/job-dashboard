import { useEffect, useMemo, useState } from "react";
import initialJobs from "../data/jobs";
import {
  fetchJobs,
  createJob,
  updateJobApi,
  deleteJobApi,
} from "../services/jobApi";

function getLatestDate(dateList) {
  const validDates = dateList.filter(Boolean);

  if (validDates.length === 0) {
    return "";
  }

  return validDates.sort((a, b) => new Date(b) - new Date(a))[0];
}

function useJobs() {
  const [jobList, setJobList] = useState(() => {
    const savedJobs = localStorage.getItem("jobs");

    if (savedJobs) {
      return JSON.parse(savedJobs);
    }

    return initialJobs;
  });

  useEffect(() => {
    async function loadJobs() {
      try {
        const jobsFromApi = await fetchJobs();
        setJobList(jobsFromApi);
      } catch (error) {
        console.error("Failed to load jobs from API:", error);
      }
    }

    loadJobs();
  }, []);

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobList));
  }, [jobList]);

  async function addJob(newJob) {
    try {
      const savedJob = await createJob(newJob);
      setJobList((prev) => [savedJob, ...prev]);
    } catch (error) {
      console.error("Failed to create job:", error);
    }
  }

  async function updateJob(updatedJob) {
    try {
      const savedJob = await updateJobApi(updatedJob.id, updatedJob);

      setJobList((prev) =>
        prev.map((job) => (job.id === savedJob.id ? savedJob : job)),
      );
    } catch (error) {
      console.error("Failed to update job:", error);
    }
  }

  async function deleteJob(jobId) {
    try {
      await deleteJobApi(jobId);
      setJobList((prev) => prev.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  }

  const analyticsSummary = useMemo(() => {
    const totalApplications = jobList.length;
    const pendingCount = jobList.filter(
      (job) => job.status === "Applied",
    ).length;
    const interviewCount = jobList.filter(
      (job) => job.status === "Interview",
    ).length;
    const offerCount = jobList.filter((job) => job.status === "Offer").length;
    const rejectedCount = jobList.filter(
      (job) => job.status === "Rejected",
    ).length;

    const responses = interviewCount + offerCount + rejectedCount;

    const responseRate =
      totalApplications === 0
        ? "0%"
        : `${Math.round((responses / totalApplications) * 100)}%`;

    const latestAppliedDate = getLatestDate(
      jobList.map((job) => job.appliedDate),
    );

    const latestInterviewDate = getLatestDate(
      jobList.map((job) => job.interviewDate),
    );

    const latestOfferDate = getLatestDate(jobList.map((job) => job.offerDate));

    return {
      totalApplications,
      pendingCount,
      interviewCount,
      offerCount,
      rejectedCount,
      responses,
      responseRate,
      latestAppliedDate,
      latestInterviewDate,
      latestOfferDate,
    };
  }, [jobList]);

  const dashboardStats = useMemo(() => {
    return [
      {
        id: 1,
        label: "Applications",
        value: analyticsSummary.totalApplications,
        description: "Total applications submitted",
      },
      {
        id: 2,
        label: "Interviews",
        value: analyticsSummary.interviewCount,
        description: "Interview stages in progress",
      },
      {
        id: 3,
        label: "Offers",
        value: analyticsSummary.offerCount,
        description: "Current offers received",
      },
      {
        id: 4,
        label: "Responses",
        value: analyticsSummary.responses,
        description: "Applications that received a response",
      },
    ];
  }, [analyticsSummary]);

  return {
    jobList,
    dashboardStats,
    analyticsSummary,
    addJob,
    updateJob,
    deleteJob,
  };
}

export default useJobs;
