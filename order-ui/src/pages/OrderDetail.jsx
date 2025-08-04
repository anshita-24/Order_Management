import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axios";

function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`/orders/${id}`);
        setOrder(res.data);
      } catch (err) {
        console.error("Failed to fetch order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!order) return <p className="p-6 text-red-600">Order not found</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📦 Order Details</h1>

      <div className="space-y-4 bg-white p-6 rounded shadow text-sm">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Customer:</strong> {order.customerName}</p>
        <p><strong>Amount:</strong> ₹{order.orderAmount.toFixed(2)}</p>
        <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
        <p>
          <strong>Invoice:</strong>{" "}
          <a
            href={order.invoiceFileUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            Download PDF
          </a>
        </p>
      </div>

      <Link to="/" className="block mt-6 text-blue-600 hover:underline">
        ← Back to Dashboard
      </Link>
    </div>
  );
}

export default OrderDetail;
