import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateOrder from "./pages/CreateOrder";
import OrderDetail from "./pages/OrderDetail";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateOrder />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
