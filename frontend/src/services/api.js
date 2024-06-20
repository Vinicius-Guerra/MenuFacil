import axios from "axios";

const menuAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 8 * 1000,
});

export {menuAPI};