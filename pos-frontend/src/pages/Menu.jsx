import React, { useEffect } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import { MdRestaurantMenu } from "react-icons/md";
import MenuContainer from "../components/menu/MenuContainer";
import CustomerInfo from "../components/menu/CustomerInfo";
import CartInfo from "../components/menu/CartInfo";
import Bill from "../components/menu/Bill";
import { useSelector } from "react-redux";

const Menu = () => {
  useEffect(() => {
    document.title = "POS | Menu";
  }, []);

  const customerData = useSelector((state) => state.customer);

  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] flex overflow-hidden">
      {/* Left Side */}
      <div className="flex-[3] flex flex-col min-h-0">
        {/* Header */}
        <div className="flex items-center justify-between px-10 py-4">
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">
              Menu
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <MdRestaurantMenu className="text-[#f5f5f5] text-4xl" />

            <div>
              <h1 className="text-white font-semibold">
                {customerData.customerName || "Customer Name"}
              </h1>

              <p className="text-[#ababab] text-sm">
                Table : {customerData.table?.tableNo || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Menu */}
        <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
          <MenuContainer />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-[1] p-4 pb-24 min-h-0">
        <div className="bg-[#1a1a1a] rounded-lg h-full flex flex-col overflow-hidden">
          <CustomerInfo />

          <hr className="border-[#2a2a2a]" />

          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <CartInfo />
          </div>

          <hr className="border-[#2a2a2a]" />

          <Bill />
        </div>
      </div>

      <BottomNav />
    </section>
  );
};

export default Menu;