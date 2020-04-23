import io from "socket.io-client";

const connect = userId => {
  const socket = io("http://localhost:3001", { query: { userId } });
  console.log(`User ${userId} connected to socket.io`);
  return socket;
};

export default connect;
