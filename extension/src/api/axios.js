import axios from "axios";
import { STATBOTICS_BASE_URL } from "@/config";

const instance = axios.create({
  baseURL: `${STATBOTICS_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
