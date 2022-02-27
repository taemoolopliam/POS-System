import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:44322/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
