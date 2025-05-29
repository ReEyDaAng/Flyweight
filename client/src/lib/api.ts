import axios from "axios";

const apiLeft = axios.create({
  baseURL: "http://localhost:8081/api/forest",
  headers: {
    "Content-Type": "application/json",
  },
});

const apiRight = axios.create({
  baseURL: "http://localhost:8082/api/forest",
  headers: {
    "Content-Type": "application/json",
  },
});

export { apiLeft, apiRight };
