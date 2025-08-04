import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

function CreateOrder() {
  const [customerName, setCustomerName] = useState("");
  const [orderAmount, setOrderAmount] = useState("");
  const [invoiceFile, setInvoiceFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!invoiceFile) {
      alert("Please upload a PDF invoice.");
      return;
    }

    const formData = new FormData();
    formData.append("customerName", customerName);
    formData.append("orderAmount", orderAmount);
    formData.append("invoice", invoiceFile);

    try {
      setLoading(true);
      await axios.post("/orders", formData, {
  headers: { "Content-Type": "multipart/form-data" },
  withCredentials: true
});

      alert("✅ Order created successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">➕ Create New Order</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block mb-1 font-medium">Customer Name</label>
          <input
            type="text"
            required
            className="w-full border p-2 rounded"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Order Amount (₹)</label>
          <input
            type="number"
            required
            className="w-full border p-2 rounded"
            value={orderAmount}
            onChange={(e) => setOrderAmount(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Invoice (PDF only)</label>
          <input
            type="file"
            accept="application/pdf"
            required
            onChange={(e) => setInvoiceFile(e.target.files[0])}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Order"}
        </button>
      </form>
    </div>
  );
}

export default CreateOrder;
