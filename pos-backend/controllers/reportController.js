exports.getDashboardReport=async(req,res)=>{res.json({success:true,summary:{orders:0,revenue:0,customers:0,profit:0},sales:[],payments:[],topItems:[]});};
exports.getSalesReport=async(req,res)=>res.json({success:true,data:[]});
exports.getDailySales=async(req,res)=>res.json({success:true,data:[]});
exports.getWeeklySales=async(req,res)=>res.json({success:true,data:[]});
exports.getMonthlySales=async(req,res)=>res.json({success:true,data:[]});
exports.getTopSellingItems=async(req,res)=>res.json({success:true,data:[]});
exports.getPaymentReport=async(req,res)=>res.json({success:true,data:[]});
