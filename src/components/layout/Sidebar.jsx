import { NavLink, Link } from "react-router-dom";
import { HiOutlineXMark } from "react-icons/hi2";
import Logo from "../../assets/JobFlow_Logo_only.png";

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
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-gray-200 bg-white px-5 py-6 transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/"
            onClick={handleCloseSidebar}
            className="flex items-center gap-3 rounded-lg px-2 py-1 transition hover:bg-gray-50"
          >
            <img
              src={Logo}
              alt="JobFlow logo"
              className="h-8 w-8 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-gray-900">
                JOBFLOW
              </span>
            </div>
          </Link>

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
                `block w-full rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-gray-900 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
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
