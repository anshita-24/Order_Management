const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const {
  createOrder,
  getAllOrders,
  getOrderById,
} = require("../controllers/orderController");

// Route: POST /orders → Create order with PDF upload
router.post("/", upload.single("invoice"), createOrder);

// Route: GET /orders → Get all orders
router.get("/", getAllOrders);

// Route: GET /orders/:id → Get one order by ID
router.get("/:id", getOrderById);

module.exports = router;
