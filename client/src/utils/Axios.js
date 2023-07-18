import axios from "axios";
import { getCookie } from "cookies-next";
let token = getCookie("login_token");

const Axios = axios.create({
  baseURL: "https://thelicham-server.vercel.app/api/v1",
  // baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*",
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});

export default Axios;
