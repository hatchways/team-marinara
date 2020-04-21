import io from "socket.io-client";

const connect = userId => {
  console.log(`User ${userId} connected to socket.io`);
  const socket = io("http://localhost:3001", { query: { userId } });
  return socket;
};

export default connect;
