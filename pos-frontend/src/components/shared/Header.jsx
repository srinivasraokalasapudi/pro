import React from "react";
import { FaSearch, FaUserCircle, FaBell } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import { logout } from "../../https";
import { removeUser } from "../../redux/slices/userSlice";

const Header = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      dispatch(removeUser());
      navigate("/auth");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="flex justify-between items-center py-4 px-8 bg-[#1a1a1a] shadow-md">

      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-4 cursor-pointer"
      >
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-yellow-400 shadow-lg bg-white flex items-center justify-center">
          <img
            src={logo}
            alt="Satya 5-Star Hotel"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Satya 5-Star Hotel
          </h1>
          <p className="text-xs text-yellow-400 tracking-[0.25em]">
            ★★★★★ PREMIUM DINING
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4 bg-[#242424] rounded-2xl px-5 py-3 w-[500px]">
        <FaSearch className="text-gray-400" />

        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent w-full outline-none text-white placeholder:text-gray-500"
        />
      </div>

      {/* User */}
      <div className="flex items-center gap-4">

        {userData.role === "Admin" && (
          <div
            onClick={() => navigate("/dashboard")}
            className="bg-[#242424] hover:bg-[#323232] p-3 rounded-xl cursor-pointer transition-all"
          >
            <MdDashboard className="text-white text-2xl" />
          </div>
        )}

        <div className="bg-[#242424] hover:bg-[#323232] p-3 rounded-xl cursor-pointer transition-all">
          <FaBell className="text-white text-2xl" />
        </div>

        <div className="flex items-center gap-3">
          <FaUserCircle className="text-white text-5xl" />

          <div>
            <h1 className="text-white font-semibold">
              {userData.name || "Test User"}
            </h1>

            <p className="text-sm text-gray-400">
              {userData.role || "Role"}
            </p>
          </div>

          <IoLogOut
            onClick={handleLogout}
            size={34}
            className="text-white hover:text-red-500 cursor-pointer transition-all"
          />
        </div>

      </div>
    </header>
  );
};

export default Header;