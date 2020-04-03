import axios from "axios";

const register = fields => {
  return axios.post("/api/users/register", fields);
};

const login = fields => {
  return axios.post("/api/users/login", fields);
};

export { register, login };
