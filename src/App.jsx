import { useEffect, useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import initialJobs from "./data/jobs";

function App() {
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

  function handleAddJob(newJob) {
    setJobList((prev) => [newJob, ...prev]);
  }

  function handleUpdateJob(updatedJob) {
    setJobList((prev) =>
      prev.map((job) => (job.id === updatedJob.id ? updatedJob : job)),
    );
  }

  function handleDeleteJob(jobId) {
    setJobList((prev) => prev.filter((job) => job.id !== jobId));
  }

  const dashboardStats = useMemo(() => {
    const totalApplications = jobList.length;
    const interviews = jobList.filter(
      (job) => job.status === "Interview",
    ).length;
    const offers = jobList.filter((job) => job.status === "Offer").length;
    const rejected = jobList.filter((job) => job.status === "Rejected").length;

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
        label: "Rejected",
        value: rejected,
        description: "Applications no longer active",
      },
      {
        id: 5,
        label: "Response Rate",
        value: responseRate,
        description: "Replies from submitted applications",
      },
    ];
  }, [jobList]);

  return (
    <MainLayout>
      <Routes>
        <Route
          path="/"
          element={
            <DashboardPage
              jobList={jobList}
              dashboardStats={dashboardStats}
              onAddJob={handleAddJob}
            />
          }
        />

        <Route
          path="/applications"
          element={
            <ApplicationsPage
              jobList={jobList}
              dashboardStats={dashboardStats}
              onAddJob={handleAddJob}
              onUpdateJob={handleUpdateJob}
              onDeleteJob={handleDeleteJob}
            />
          }
        />

        <Route
          path="/analytics"
          element={
            <AnalyticsPage jobList={jobList} dashboardStats={dashboardStats} />
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
