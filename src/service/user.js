import fetcher from "./fetcher";

export default {
  listUser(req) {
    const api = fetcher.generateApi();
    return api.get("/user", req).then(res => res.data);
  },

  createUser(req) {
    const api = fetcher.generateApi();
    return api.post("/user", req).then(res => res);
  },

  detailUser(req) {
    const api = fetcher.generateApi();
    return api.get("user/" + req).then(res => res);
  },

  updateUser(req) {
    const api = fetcher.generateApi();
    return api.put("user", req).then(res => res);
  },

  deleteUser(req) {
    const api = fetcher.generateApi();
    return api.delete("user/" + req).then(res => res);
  }
};
