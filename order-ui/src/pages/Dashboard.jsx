import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch all orders
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📋 All Orders</h1>
        <Link to="/create" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          ➕ Create Order
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Invoice</th>
              <th className="px-4 py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="px-4 py-2">{order._id}</td>
                <td className="px-4 py-2">{order.customerName}</td>
                <td className="px-4 py-2">₹{order.orderAmount.toFixed(2)}</td>
                <td className="px-4 py-2">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <a
                    href={order.invoiceFileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </a>
                </td>
                <td className="px-4 py-2">
                  <Link
                    to={`/orders/${order._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <p className="text-gray-500 mt-4">No orders found.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
