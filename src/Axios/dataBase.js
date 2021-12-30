import axios from "axios";

const dataBase = axios.create({
  baseURL: "https://61c302e89cfb8f0017a3e890.mockapi.io/session",
});

export default dataBase;
