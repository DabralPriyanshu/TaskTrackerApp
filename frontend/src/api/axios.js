import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api/v1/task",
});

export default API;
