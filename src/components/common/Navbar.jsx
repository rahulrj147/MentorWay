import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";

import logo from "../../assets/Logo/logo.jpg";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/ProfileDropDown";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false); // For mobile

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(res.data.data);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-blue-50 border-b border-gray-300 shadow-md z-50">
      <div className="flex items-center justify-between w-11/12 max-w-maxContent mx-auto h-14">
        {/* Logo */}
        <Link to="/" className="flex items-center text-blue-700 font-bold text-lg italic gap-x-1">
          <img src={logo} alt="Logo" width={35} height={12} loading="lazy" />
          <p>MentorWay</p>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-800">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className={`group relative flex cursor-pointer items-center gap-1 ${
                    matchRoute("/catalog/:catalogName") ? "text-blue-800" : "text-richblack-600"
                  }`}>
                    <p>Catalog</p>
                    <BsChevronDown />
                    {/* Hover Dropdown - Desktop */}
                    <div className="invisible absolute left-[50%] top-full z-10 flex w-[200px] translate-x-[-50%] flex-col rounded-lg bg-white p-4 text-gray-900 opacity-0 shadow-md transition-all duration-200 group-hover:visible group-hover:opacity-100">
                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : subLinks.length ? (
                        subLinks
                          .filter((subLink) => subLink?.courses?.length > 0)
                          .map((subLink, i) => (
                            <Link
                              to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                              className="block py-2 px-4 hover:bg-gray-100 rounded"
                              key={i}
                            >
                              {subLink.name}
                            </Link>
                          ))
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link.path}>
                    <p className={`hover:underline transition-all ${
                      matchRoute(link.path) ? "text-blue-900" : "text-richblack-900"
                    }`}>
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth & Cart - Desktop */}
        <div className="hidden md:flex items-center gap-x-4">
          {user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full bg-gray-700 text-white text-xs font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null ? (
            <>
              <Link to="/login">
                <button className="px-4 py-2 border rounded-md bg-gray-800 text-white hover:bg-gray-700">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-4 py-2 border rounded-md bg-gray-800 text-white hover:bg-gray-700">
                  Sign up
                </button>
              </Link>
            </>
          ) : (
            <ProfileDropdown />
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          <AiOutlineMenu fontSize={24} className="text-gray-700" />
        </button>
      </div>


{/* Mobile Dropdown Menu */}
{isOpen && (
  <div className="md:hidden absolute left-0 top-14 w-full bg-white shadow-md py-3 px-5 flex flex-col items-center gap-y-3">
    {NavbarLinks.map((link, index) => (
      <div key={index} className="w-full text-center">
        {link.title === "Catalog" ? (
          <>
            <button
              onClick={() => setIsCatalogOpen(!isCatalogOpen)}
              className="w-full py-2 flex items-center justify-center gap-2 text-gray-800"
            >
              Catalog <BsChevronDown />
            </button>
            {isCatalogOpen && (
              <div className="bg-gray-100 w-full rounded-md py-2">
                {loading ? (
                  <p className="text-center">Loading...</p>
                ) : subLinks.length ? (
                  subLinks
                    .filter((subLink) => subLink?.courses?.length > 0)
                    .map((subLink, i) => (
                      <Link
                        key={i}
                        to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                        className="block py-2 px-4 hover:bg-gray-200"
                        onClick={() => {
                          setIsCatalogOpen(false);
                          setIsOpen(false);
                        }}
                      >
                        {subLink.name}
                      </Link>
                    ))
                ) : (
                  <p className="text-center">No Courses Found</p>
                )}
              </div>
            )}
          </>
        ) : (
          <Link
            to={link.path}
            className="text-gray-800 text-lg"
            onClick={() => setIsOpen(false)}
          >
            {link.title}
          </Link>
        )}
      </div>
    ))}

    {/* Add Login & Signup with onClick */}
    {token === null ? (
      <>
        <Link to="/login" onClick={() => setIsOpen(false)}>
          <button className="w-full px-4 py-2 border rounded-md bg-gray-800 text-black hover:bg-gray-700">
            Log in
          </button>
        </Link>
        <Link to="/signup" onClick={() => setIsOpen(false)}>
          <button className="w-full px-4 py-2 border rounded-md bg-gray-800 text-black hover:bg-gray-700">
            Sign up
          </button>
        </Link>
      </>
    ) : (
      <ProfileDropdown />
    )}
  </div>
)}

    </div>
  );
}

export default Navbar;
