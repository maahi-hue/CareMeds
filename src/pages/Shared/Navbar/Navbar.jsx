import { useEffect, useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/icon/logo.png";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import { AuthContext } from "../../../Provider/AuthProvider";

const Navbar = () => {
  const [cart] = useCart();
  const { user, loading, logOut } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`navbar sticky top-0 z-50 ${
        isScrolled ? "bg-opacity-80 bg-[#789DBC]" : "bg-[#789DBC]"
      } transition-all duration-300 text-white`}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
          </div>
          <ul
            tabIndex={0}
            className="space-x-2 menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "btn bg-[#FFE3E3] font-bold text-[#1c1858]"
                  : "btn bg-base-100 font-bold"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/medicines"
              className={({ isActive }) =>
                isActive
                  ? "btn bg-[#FFE3E3] font-bold text-[#1c1858]"
                  : "btn bg-base-100 font-bold"
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "btn bg-[#FFE3E3] font-bold text-[#1c1858]"
                  : "btn bg-base-100 font-bold"
              }
            >
              <FaShoppingCart className="" />
              <div className="badge badge-outline">+{cart.length}</div>
            </NavLink>
          </ul>
        </div>
        <img className="h-20" src={logo}></img>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "btn bg-[#FFE3E3] font-bold text-[#1c1858]"
                : "btn bg-base-100 font-bold"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/medicines"
            className={({ isActive }) =>
              isActive
                ? "btn bg-[#FFE3E3] font-bold text-[#1c1858]"
                : "btn bg-base-100 font-bold"
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "btn bg-[#FFE3E3] font-bold text-[#1c1858]"
                : "btn bg-base-100 font-bold"
            }
          >
            <FaShoppingCart className="" />
            <div className="badge badge-outline">+{cart.length}</div>
          </NavLink>
        </ul>
      </div>
      <div className="navbar-end">
        {!user && (
          <li className="text-white">
            <NavLink to="/login">Join Us</NavLink>
          </li>
        )}

        {user && (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div title={user?.displayName} className="w-10 rounded-full">
                <img
                  referrerPolicy="no-referrer"
                  alt="User Profile Photo"
                  src={user?.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li className="btn bg-base-100 font-bold hover:bg-[#FFE3E3] hover:text-[#1c1858]">
                <Link to="/update-profile">Update Profile</Link>
              </li>
              <li className="btn bg-base-100 font-bold hover:bg-[#FFE3E3] hover:text-[#1c1858]">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button
                  onClick={logOut}
                  className="btn bg-base-100 font-bold hover:bg-[#FFE3E3] hover:text-[#1c1858]"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
