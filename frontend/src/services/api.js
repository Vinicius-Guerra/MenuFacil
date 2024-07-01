import axios from "axios";

const menuAPI = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 8 * 1000,
});

export { menuAPI };
