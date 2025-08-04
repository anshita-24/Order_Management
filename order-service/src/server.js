const app = require("./app");
const connectDB = require("./config/db");
const dotenv = require("dotenv");

dotenv.config();

// Connect to MongoDB Atlas
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
