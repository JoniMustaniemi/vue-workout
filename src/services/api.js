import axios from "axios";

// Use the production backend URL
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  getItems() {
    return apiClient.get("/items");
  },
  addItem(item) {
    return apiClient.post("/items", item);
  },
};
