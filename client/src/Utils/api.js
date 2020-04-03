import axios from "axios";

const register = async fields => {
  return axios.post("/api/users/register", fields);
};

export { register };
