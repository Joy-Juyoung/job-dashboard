import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import useJobs from "./hooks/useJobs";

function App() {
  const {
    jobList,
    dashboardStats,
    analyticsSummary,
    addJob,
    updateJob,
    deleteJob,
  } = useJobs();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={
            <DashboardPage
              jobList={jobList}
              dashboardStats={dashboardStats}
              onAddJob={addJob}
            />
          }
        />
        <Route
          path="applications"
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
          path="analytics"
          element={<AnalyticsPage analyticsSummary={analyticsSummary} />}
        />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
