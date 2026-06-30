import React, { useState } from "react";
import {
  FaCheckDouble,
  FaLongArrowAltRight,
  FaCircle,
} from "react-icons/fa";
import { enqueueSnackbar } from "notistack";
import { updateOrderStatus } from "../../https";
import {
  formatDateAndTime,
  getAvatarName,
} from "../../utils";

const OrderCard = ({ order }) => {
  const [status, setStatus] = useState(order.orderStatus);
  const [loading, setLoading] = useState(false);

  const handleStatusUpdate = async (newStatus) => {
    if (status === newStatus) return;

    try {
      setLoading(true);

      const { data } = await updateOrderStatus({
        orderId: order._id,
        orderStatus: newStatus,
      });

      setStatus(newStatus);

      enqueueSnackbar(data.message, {
        variant: "success",
      });

      window.location.reload();

    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.message ||
          "Unable to update order.",
        {
          variant: "error",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#262626] rounded-xl p-6 shadow-md hover:bg-[#2c2c2c] transition">

      {/* Header */}

      <div className="flex justify-between">

        <div className="flex gap-4">

          <div className="w-16 h-16 rounded-xl bg-[#f6b100] flex items-center justify-center text-2xl font-bold text-black">
            {getAvatarName(order.customerDetails.name)}
          </div>

          <div>

            <h2 className="text-white text-xl font-semibold">
              {order.customerDetails.name}
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              #{Math.floor(
                new Date(order.orderDate).getTime()
              )}
            </p>

            <p className="text-gray-400 text-sm mt-2">
              Table
              <FaLongArrowAltRight className="inline mx-2" />
              {order.table?.tableNo || "N/A"}
            </p>

          </div>

        </div>

        <div>

          {status === "Ready" ? (
            <div className="bg-green-800 px-4 py-2 rounded-lg text-green-200">
              <FaCheckDouble className="inline mr-2" />
              Ready
            </div>
          ) : (
            <div className="bg-yellow-800 px-4 py-2 rounded-lg text-yellow-200">
              <FaCircle className="inline mr-2 text-xs" />
              {status}
            </div>
          )}

        </div>

      </div>

      {/* Date */}

      <div className="flex justify-between mt-6 text-gray-400 text-sm">

        <p>{formatDateAndTime(order.orderDate)}</p>

        <p>{order.items.length} Item(s)</p>

      </div>

      <hr className="border-gray-700 my-5" />

      {/* Total */}

      <div className="flex justify-between items-center">

        <h2 className="text-white text-xl font-semibold">
          Total
        </h2>

        <h2 className="text-[#f6b100] text-2xl font-bold">
          ₹{order.bills.totalWithTax.toFixed(2)}
        </h2>

      </div>

      {/* Status Buttons */}

      <div className="grid grid-cols-3 gap-3 mt-6">

        <button
          disabled={loading || status === "In Progress"}
          onClick={() =>
            handleStatusUpdate("In Progress")
          }
          className={`py-2 rounded-lg text-white font-semibold ${
            status === "In Progress"
              ? "bg-yellow-600"
              : "bg-gray-700 hover:bg-yellow-600"
          }`}
        >
          In Progress
        </button>

        <button
          disabled={loading || status === "Ready"}
          onClick={() =>
            handleStatusUpdate("Ready")
          }
          className={`py-2 rounded-lg text-white font-semibold ${
            status === "Ready"
              ? "bg-blue-600"
              : "bg-gray-700 hover:bg-blue-600"
          }`}
        >
          Ready
        </button>

        <button
          disabled={loading || status === "Completed"}
          onClick={() =>
            handleStatusUpdate("Completed")
          }
          className={`py-2 rounded-lg text-white font-semibold ${
            status === "Completed"
              ? "bg-green-600"
              : "bg-gray-700 hover:bg-green-600"
          }`}
        >
          Completed
        </button>

      </div>

      <div className="mt-5 text-gray-400 text-sm">

        Current Status :

        <span className="ml-2 text-white font-semibold">
          {status}
        </span>

      </div>

    </div>
  );
};

export default OrderCard;