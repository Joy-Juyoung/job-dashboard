import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import useJobs from "./hooks/useJobs";

function App() {
  const { jobList, dashboardStats, addJob, updateJob, deleteJob } = useJobs();

  return (
    <MainLayout>
      <Routes>
        <Route
          path="/"
          element={
            <DashboardPage
              jobList={jobList}
              dashboardStats={dashboardStats}
              onAddJob={addJob}
            />
          }
        />

        <Route
          path="/applications"
          element={
            <ApplicationsPage
              jobList={jobList}
              onAddJob={addJob}
              onUpdateJob={updateJob}
              onDeleteJob={deleteJob}
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
