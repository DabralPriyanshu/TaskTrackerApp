import axios from "axios";

const API = axios.create({
  baseURL: "https://tasktrackerapp-jjgn.onrender.com",
});

export default API;
