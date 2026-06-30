const Order = require("../models/orderModel");
const Table = require("../models/tableModel");
const Customer = require("../models/customerModel");
const Payment = require("../models/paymentModel");
const Stats = require("../models/statsModel");

const getDashboardStats = async (req, res) => {
  try {
    const today = new Date();

    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    const startOfMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    // ===============================
    // Lifetime Statistics
    // ===============================

    let stats = await Stats.findOne();

    if (!stats) {
      stats = await Stats.create({
        totalEarnings: 0,
        totalOrders: 0,
      });
    }

    // ===============================
    // Dashboard Counts
    // ===============================

    const [
      totalTables,
      totalCustomers,
      activeOrders,
      recentOrders,
      recentTransactions,
    ] = await Promise.all([
      Table.countDocuments(),
      Customer.countDocuments(),
      Order.countDocuments({
        orderStatus: { $ne: "Completed" },
      }),
      Order.find()
        .populate("table")
        .populate("customer")
        .sort({ createdAt: -1 })
        .limit(5),
      Payment.find()
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    // ===============================
    // Today's Revenue
    // ===============================

    const todayRevenueResult = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$bills.totalWithTax",
          },
        },
      },
    ]);

    const todayRevenue = todayRevenueResult[0]?.total || 0;

    // ===============================
    // Monthly Revenue
    // ===============================

    const monthlyRevenueResult = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfMonth,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$bills.totalWithTax",
          },
        },
      },
    ]);

    const monthlyRevenue = monthlyRevenueResult[0]?.total || 0;

    // ===============================
    // Weekly Revenue
    // ===============================

    const weeklyRevenue = [];

    for (let i = 6; i >= 0; i--) {
      const start = new Date();

      start.setDate(today.getDate() - i);
      start.setHours(0, 0, 0, 0);

      const end = new Date(start);
      end.setHours(23, 59, 59, 999);

      const result = await Order.aggregate([
        {
          $match: {
            createdAt: {
              $gte: start,
              $lte: end,
            },
          },
        },
        {
          $group: {
            _id: null,
            revenue: {
              $sum: "$bills.totalWithTax",
            },
          },
        },
      ]);

      weeklyRevenue.push({
        day: start.toLocaleDateString("en-US", {
          weekday: "short",
        }),
        revenue: result[0]?.revenue || 0,
      });
    }

    // ===============================
    // Top Selling Foods
    // ===============================

    const topSellingFoods = await Order.aggregate([
      {
        $unwind: "$items",
      },
      {
        $group: {
          _id: "$items.name",
          orders: {
            $sum: "$items.quantity",
          },
          revenue: {
            $sum: {
              $multiply: [
                "$items.quantity",
                "$items.price",
              ],
            },
          },
        },
      },
      {
        $sort: {
          orders: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    // ===============================
    // Payment Summary
    // ===============================

    const paymentMethods = await Payment.aggregate([
      {
        $group: {
          _id: "$method",
          total: {
            $sum: "$amount",
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    // ===============================
    // Response
    // ===============================

    res.status(200).json({
      success: true,
      data: {
        totalEarnings: stats.totalEarnings,
        totalOrders: stats.totalOrders,
        activeOrders,

        summary: {
          totalRevenue: stats.totalEarnings,
          todayRevenue,
          monthlyRevenue,
          totalCustomers,
          totalTables,
          activeOrders,
          completedOrders: stats.totalOrders,
        },

        weeklyRevenue,
        topSellingFoods,
        paymentMethods,
        recentOrders,
        recentTransactions,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};