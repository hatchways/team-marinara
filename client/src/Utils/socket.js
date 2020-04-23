import io from "socket.io-client";

const connect = userId => {
  const url = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";
  const socket = io(url, { query: { userId } });
  console.log(`User ${userId} connected to socket.io`);
  return socket;
};

export default connect;
