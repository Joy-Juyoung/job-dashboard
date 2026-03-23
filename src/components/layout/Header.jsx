import { useLocation } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";

function Header({ setIsSidebarOpen }) {
  const location = useLocation();

  const pageLabels = {
    "/": "Dashboard Overview",
    "/applications": "Manage Applications",
    "/analytics": "Analytics Overview",
  };

  const currentLabel = pageLabels[location.pathname] || "Job Dashboard";

  return (
    <header className="border-b bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Job Dashboard
          </p>
          <p className="mt-1 text-sm text-gray-600">{currentLabel}</p>
        </div>

        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 lg:hidden"
          aria-label="Open sidebar menu"
        >
          <HiOutlineMenu className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}

export default Header;
