import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineMenu, HiOutlineHome } from "react-icons/hi";

function Header({ setIsSidebarOpen, setToken, clearJobs }) {
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("jobs");

    clearJobs();
    setToken(null);

    navigate("/login", { replace: true });
  }

  const pageLabels = {
    "/": "Dashboard",
    "/applications": "Applications",
    "/analytics": "Analytics",
  };

  const currentLabel = pageLabels[location.pathname] || "Dashboard";

  return (
    <header className="border-b border-gray-200 bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-700"
          >
            <HiOutlineHome className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
              JobFlow
            </span>
          </Link>

          <span className="text-gray-300">/</span>

          <p className="truncate text-sm font-medium text-gray-700">
            {currentLabel}
          </p>
        </div>

        <div className="flex items-center">
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>

          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 lg:hidden"
            aria-label="Open sidebar menu"
          >
            <HiOutlineMenu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
