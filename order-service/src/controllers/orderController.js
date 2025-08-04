const { v4: uuidv4 } = require("uuid");
const Order = require("../models/Order");

// POST /orders → Create new order
exports.createOrder = async (req, res) => {
  try {
    const { customerName, orderAmount } = req.body;

    console.log("📥 Request body:", req.body);
    console.log("📄 Uploaded file:", req.file);

    if (!customerName || !orderAmount) {
      return res.status(400).json({ message: "Missing fields" });
    }

    let invoiceUrl = "";
    if (req.file) {
      invoiceUrl = `/uploads/${req.file.filename}`;
    }

    const newOrder = new Order({
      orderId: uuidv4(),
      customerName,
      orderAmount,
      orderDate: new Date().toISOString(),
      invoiceFileUrl: invoiceUrl,
    });

    await newOrder.save();
    console.log("✅ Order saved to DB:", newOrder);

    // Simulate SNS
    console.log(`🔔 Notification: New order from ${customerName}`);

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("❌ Error creating order:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// GET /orders → Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error("❌ Error fetching orders:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /orders/:id → Get one order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.id });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("❌ Error fetching order:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
