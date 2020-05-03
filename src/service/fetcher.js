import axios from "axios";

export default {
  generateApi() {
    const api = axios.create({
      baseURL: "http://localhost:5000/",
    });

    return api;
  }
};
