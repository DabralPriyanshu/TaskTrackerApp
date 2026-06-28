import axios from "axios";

const API = axios.create({
  baseURL: "https://tasktrackerapp-jjgn.onrender.com/api/v1/task",
});

export default API;
