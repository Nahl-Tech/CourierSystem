import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaList,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import { TbReorder } from "react-icons/tb";
// You can remove the Sidebar.css import if you're handling all styles with Tailwind
// import "./Sidebar.css"; 

function Sidebar() {
  const [openDropdowns, setOpenDropdowns] = useState({
    riders: false,
    orders: false,
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false); // State to track if the screen is mobile
  const navigate = useNavigate();

  useEffect(() => {
    // Function to handle the sidebar state based on window width
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true); // Open sidebar for large screens
        setIsMobile(false);
      } else {
        setSidebarOpen(false); // Close sidebar for small screens
        setIsMobile(true);
      }
    };

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Call the handler right away to set the initial state
    handleResize();

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body from scrolling when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen, isMobile]);

  const toggleDropdown = (dropdown) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("role");

    // Redirect to login page
    navigate("/RiderLogin");
  };

  return (
    <>
      <div className="flex h-screen">
        {/* Toggle Button for Small Screens */}
        <button
          onClick={toggleSidebar}
          className={`fixed top-4 left-4 z-50 text-gray-800 hover:text-gray-400 md:hidden transition-all duration-300`}
          aria-label={sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
          aria-expanded={sidebarOpen}
          aria-controls="sidebar"
        >
          {sidebarOpen ? (
            <FaTimes className="w-6 h-6" />
          ) : (
            <FaBars className="w-6 h-6" />
          )}
        </button>

        {/* Sidebar */}
        <aside
          id="sidebar"
          className={`fixed top-0 left-0 h-full bg-gray-900 text-white flex-shrink-0 shadow-lg transition-transform duration-300 ${
            sidebarOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full"
          } md:translate-x-0 md:static md:w-64 z-50`}
          aria-label="Sidebar Navigation"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
            </div>
            <ul className="space-y-4">
              {/* Add Rider */}
              <li>
                <Link
                  to="/AddRiders"
                  className="flex items-center space-x-2 py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out"
                >
                  <FaPlus className="w-6 h-6" />
                  <span>Add Rider</span>
                </Link>
              </li>

              {/* Riders List */}
              <li>
                <Link
                  to="/RidersList"
                  className="flex items-center space-x-2 py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out"
                >
                  <FaList className="w-6 h-6" />
                  <span>Riders List</span>
                </Link>
              </li>

              {/* Add Order */}
              <li>
                <Link
                  to="/OrdersAdd"
                  className="flex items-center space-x-2 py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out"
                >
                  <FaPlus className="w-6 h-6" />
                  <span>Add Order</span>
                </Link>
              </li>

              {/* Orders List */}
              <li>
                <Link
                  to="/OrdersList"
                  className="flex items-center space-x-2 py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out"
                >
                  <FaList className="w-6 h-6" />
                  <span>Orders List</span>
                </Link>
              </li>

              {/* Orders Manage */}
              <li>
                <Link
                  to="/OrdersManage"
                  className="flex items-center space-x-2 py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out"
                >
                  <TbReorder className="w-6 h-6" />
                  <span>Orders Manage</span>
                </Link>
              </li>

              {/* Logout Button */}
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 py-3 px-6 rounded-lg hover:bg-red-800 transition duration-300 ease-in-out w-full text-left"
                >
                  <FaSignOutAlt className="w-6 h-6" />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </aside>

        {/* Overlay */}
        {sidebarOpen && isMobile && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={toggleSidebar}
            aria-hidden="true"
          />
        )}


      </div>
    </>
  );
}

export default Sidebar;
