import axios from "axios";

const api = axios.create({
  baseURL: "https://omni-stack-week-6-backend.herokuapp.com"
});

export default api;
