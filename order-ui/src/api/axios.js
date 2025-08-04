import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000", // ✅ make sure this matches backend port
  withCredentials: true,
});
