import {
  IoFastFoodOutline,
  IoHomeOutline,
  IoBookOutline,
  IoAddOutline,
  IoPersonOutline,
  IoStatsChart,
  IoClose,
} from "react-icons/io5";
import { NavLink } from "react-router";
import { use } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import ThemeToggle from "../Theme/ThemeToggle";

const Sidebar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const { user } = use(AuthContext);

  const navItems = [
    { to: "/dashboard", icon: <IoStatsChart size={20} />, label: "Dashboard" },
    { to: "/", icon: <IoHomeOutline size={20} />, label: "Home" },
    {
      to: "/all-recipe",
      icon: <IoBookOutline size={20} />,
      label: "All Recipes",
    },
    {
      to: "/add-recipe",
      icon: <IoAddOutline size={20} />,
      label: "Add Recipe",
    },
    {
      to: "/my-recipe",
      icon: <IoPersonOutline size={20} />,
      label: "My Recipes",
    },
  ];

  const renderLinks = () => (
    <ul className="space-y-2">
      {navItems.map(({ to, icon, label }) => (
        <li key={to}>
          <NavLink
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`
            }
            onClick={() => setMobileMenuOpen(false)} // closes menu on click
          >
            {icon}
            <span>{label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-gray-800 p-4 md:hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <IoFastFoodOutline
                size={24}
                className="text-violet-600 cursor-pointer"
              />
              <h1 className="text-lg font-bold dark:text-white">SpiceSpoon</h1>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl text-gray-700 dark:text-white"
            >
              <IoClose />
            </button>
          </div>

          {user && (
            <div className="mb-4 flex items-center gap-3 border-b pb-4 border-gray-200 dark:border-gray-700">
              <div className="w-10 h-10 rounded-full ring-2 ring-violet-600 overflow-hidden">
                <img
                  src={
                    user.photoURL ||
                    "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Background-PNG-Clip-Art.png"
                  }
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium dark:text-white">
                  {user.displayName || "User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Premium Member
                </p>
              </div>
            </div>
          )}

          {renderLinks()}

          <div className="mt-6">
            <ThemeToggle />
            {user && (
              <button className="w-full mt-3 p-2 rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 transition-colors flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clipRule="evenodd"
                  />
                </svg>
                Logout
              </button>
            )}
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-screen w-64 fixed top-0 left-0 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 flex-col z-30">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
          <IoFastFoodOutline size={28} className="text-violet-600" />
          <h1 className="text-xl font-bold dark:text-white">SpiceSpoon</h1>
        </div>

        {user && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full ring-2 ring-violet-600 ring-offset-2">
                <img
                  src={
                    user.photoURL ||
                    "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Background-PNG-Clip-Art.png"
                  }
                  alt="User Avatar"
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <p className="font-medium dark:text-white">
                {user.displayName || "User"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Premium Member
              </p>
            </div>
          </div>
        )}

        <nav className="flex-1 overflow-y-auto p-4">{renderLinks()}</nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <ThemeToggle />
          {user && (
            <button className="w-full mt-3 p-2 rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 transition-colors flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clipRule="evenodd"
                />
              </svg>
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
