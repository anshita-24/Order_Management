const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  orderAmount: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: String,
    required: true,
  },
  invoiceFileUrl: {
    type: String,
    default: "",
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
