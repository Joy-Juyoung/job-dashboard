import { useState } from "react";
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
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const {
    jobList,
    dashboardStats,
    analyticsSummary,
    addJob,
    updateJob,
    deleteJob,
    clearJobs,
  } = useJobs(token);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage setToken={setToken} />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute token={token}>
            <MainLayout setToken={setToken} clearJobs={clearJobs} />
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

      <Route
        path="*"
        element={<Navigate to={token ? "/" : "/login"} replace />}
      />
    </Routes>
  );
}

export default App;
