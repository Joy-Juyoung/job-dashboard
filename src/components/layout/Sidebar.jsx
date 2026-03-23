import { NavLink } from "react-router-dom";
import { HiOutlineXMark } from "react-icons/hi2";

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Applications", path: "/applications" },
    { label: "Analytics", path: "/analytics" },
  ];

  function handleCloseSidebar() {
    setIsSidebarOpen(false);
  }

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={handleCloseSidebar}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r bg-white p-6 transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold">Job Dashboard</h2>
            <p className="text-sm text-gray-500">Frontend Portfolio Project</p>
          </div>

          <button
            type="button"
            onClick={handleCloseSidebar}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 lg:hidden"
            aria-label="Close sidebar menu"
          >
            <HiOutlineXMark className="h-5 w-5" />
          </button>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={handleCloseSidebar}
              className={({ isActive }) =>
                `block w-full rounded-lg px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
