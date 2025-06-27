import { use } from "react";
import { IoFastFoodOutline } from "react-icons/io5";
import { Link, useNavigate, NavLink } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import { Loader } from "lucide-react";
import ThemeToggle from "../Theme/ThemeToggle";

const Navbar = () => {
  const { user, logOut, loading } = use(AuthContext);
  const navigate = useNavigate();

  const handleSignIn = () => navigate("/auth/sign-in");
  const handleSignUp = () => navigate("/auth/sign-up");

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "mx-3 my-2 text-violet-600 font-semibold text-base"
            : "mx-3 my-2 nav-text text-base"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/all-recipe"
        className={({ isActive }) =>
          isActive
            ? "mx-3 my-2 text-violet-600 font-semibold text-base"
            : "mx-3 my-2 nav-text text-base"
        }
      >
        All Recipes
      </NavLink>
      <NavLink
        to="/add-recipe"
        className={({ isActive }) =>
          isActive
            ? "mx-3 my-2 text-violet-600 font-semibold text-base"
            : "mx-3 my-2 nav-text text-base"
        }
      >
        Add Recipe
      </NavLink>
      <NavLink
        to="/my-recipe"
        className={({ isActive }) =>
          isActive
            ? "mx-3 my-2 text-violet-600 font-semibold text-base"
            : "mx-3 my-2 nav-text text-base"
        }
      >
        My Recipes
      </NavLink>
      <NavLink
        to="/auth/sign-in"
        className={({ isActive }) =>
          isActive
            ? "mx-3 my-2 text-violet-600 font-semibold text-base"
            : "mx-3 my-2 nav-text text-base sm:block md:hidden"
        }
      >
        Sign In
      </NavLink>
      <NavLink
        to="/auth/sign-up"
        className={({ isActive }) =>
          isActive
            ? "mx-3 my-2 text-violet-600 font-semibold text-base"
            : "mx-3 my-2 nav-text text-base sm:block md:hidden"
        }
      >
        Sign Up
      </NavLink>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive
            ? "mx-3 my-2 text-violet-600 font-semibold text-base"
            : "mx-3 my-2 nav-text text-base"
        }
      >
        Dashboard
      </NavLink>
    </>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin text-violet-600" size={40} />
      </div>
    );
  }

  return (
    <div className="shadow-md backdrop-blur-md border-b border-white/10 z-[999]  sticky top-0">
      <div className="navbar container mx-auto max-w-7xl px-4">
        {/* START */}
        <div className="navbar-start">
          {/* Hamburger - Mobile */}
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
              aria-label="Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[999] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {links}
            </ul>
          </div>

          {/* Logo */}
          <Link
            className="btn btn-ghost text-xl hover:bg-transparent flex items-center gap-2"
            to="/"
          >
            <IoFastFoodOutline size={28} className="text-violet-600" />
            <h1 className="text-xl sm:text-2xl font-bold">SpiceSpoon</h1>
          </Link>
        </div>

        {/* CENTER LINKS - Large Screens */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        {/* END - Theme + Auth */}
        <div className="navbar-end gap-2">
          <ThemeToggle />
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="avatar cursor-pointer">
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
              <ul
                tabIndex={0}
                className="dropdown-content z-[999] menu p-2 shadow bg-base-100 rounded-box w-52 mt-4"
              >
                <li>
                  <span className="text-green-600 font-semibold">
                    {user?.displayName}
                  </span>
                </li>
                <li>
                  <Link
                    onClick={() => logOut()}
                    to="/auth/sign-in"
                    className="text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSignIn}
                className="btn bg-violet-600 text-white rounded-3xl px-4 py-1 text-sm hidden md:block"
              >
                Sign In
              </button>
              <button
                onClick={handleSignUp}
                className="btn bg-violet-600 text-white rounded-3xl px-4 py-1 text-sm hidden md:block"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
