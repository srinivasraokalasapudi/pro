import React, { useEffect } from "react";
import {
  FaChartBar,
  FaUsers,
  FaUtensils,
  FaBoxes,
  FaMoneyBillWave,
  FaUserFriends,
  FaCog,
  FaFileExport,
  FaSignOutAlt,
  FaChevronRight,
  FaBell,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

import BottomNav from "../components/shared/BottomNav";
import { logout } from "../https";

const menus = [
  {
    title: "Reports",
    subtitle: "Sales & Analytics",
    icon: <FaChartBar />,
    path: "/reports",
  },
  {
    title: "Staff",
    subtitle: "Manage Employees",
    icon: <FaUsers />,
    path: "/staff",
  },
  {
    title: "Menu Management",
    subtitle: "Food Categories & Items",
    icon: <FaUtensils />,
    path: "/menu-management",
  },
  {
    title: "Inventory",
    subtitle: "Stock Management",
    icon: <FaBoxes />,
    path: "/inventory",
  },
  {
    title: "Payments",
    subtitle: "Transaction History",
    icon: <FaMoneyBillWave />,
    path: "/payments",
  },
  {
    title: "Customers",
    subtitle: "Customer Database",
    icon: <FaUserFriends />,
    path: "/customers",
  },
  {
    title: "Settings",
    subtitle: "Hotel Configuration",
    icon: <FaCog />,
    path: "/settings",
  },
  {
    title: "Export Reports",
    subtitle: "PDF / Excel",
    icon: <FaFileExport />,
    path: "/export",
  },
  {
    title: "Notifications",
    subtitle: "Alerts & Updates",
    icon: <FaBell />,
    path: "/notifications",
  },
];

const More = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Satya POS | More";
  }, []);

  const handleLogout = async () => {
    try {
      await logout();

      localStorage.clear();
      sessionStorage.clear();

      enqueueSnackbar("Logged out successfully", {
        variant: "success",
      });

      navigate("/auth");
    } catch (error) {
      enqueueSnackbar("Logout failed", {
        variant: "error",
      });
    }
  };

  return (
    <section className="bg-[#1f1f1f] min-h-screen pb-28">
      <div className="px-6 pt-8">
        <h1 className="text-white text-4xl font-bold">
          More
        </h1>

        <p className="text-gray-400 mt-2">
          Hotel Management Center
        </p>

        <div className="grid grid-cols-2 gap-4 mt-8">
          {menus.map((item) => (
            <div
              key={item.title}
              onClick={() => navigate(item.path)}
              className="bg-[#262626] rounded-2xl p-5 cursor-pointer hover:bg-[#303030] transition-all duration-300 border border-transparent hover:border-yellow-500"
            >
              <div className="flex justify-between items-center">
                <div className="w-14 h-14 rounded-xl bg-yellow-500 flex items-center justify-center text-2xl text-black">
                  {item.icon}
                </div>

                <FaChevronRight className="text-gray-500" />
              </div>

              <h2 className="text-white text-lg font-semibold mt-5">
                {item.title}
              </h2>

              <p className="text-gray-400 text-sm mt-1">
                {item.subtitle}
              </p>
            </div>
          ))}

          {/* Logout Card */}
          <div
            onClick={handleLogout}
            className="bg-red-600 rounded-2xl p-5 cursor-pointer hover:bg-red-700 transition-all duration-300 col-span-2"
          >
            <div className="flex justify-between items-center">
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center text-2xl text-red-600">
                <FaSignOutAlt />
              </div>

              <FaChevronRight className="text-white" />
            </div>

            <h2 className="text-white text-xl font-semibold mt-5">
              Logout
            </h2>

            <p className="text-red-100 text-sm mt-1">
              Sign out securely
            </p>
          </div>
        </div>

        <div className="text-center mt-12 text-gray-500 text-sm">
          Version 1.0.0
          <br />
          © Satya 5-Star Hotel
        </div>
      </div>

      <BottomNav />
    </section>
  );
};

export default More;