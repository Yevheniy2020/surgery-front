import axios from "axios";

const baseURL =
  "https://operationsdepartment-byamexc8djgzexdq.canadacentral-01.azurewebsites.net/api";
export const client = axios.create({ baseURL });
