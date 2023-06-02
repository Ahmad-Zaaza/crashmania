import { GameMessage } from "@/lib/gameTypes";
import { NextApiRequest, NextApiResponse } from "next";

import { Server, Socket } from "socket.io";

export default function SocketHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // It means that socket server was already initialised
  if (res.socket && (res.socket as any).server.io) {
    console.log("Socket has been already set up");
    res.end();
    return;
  }

  const io = new Server((res.socket as any).server);
  console.log(res.socket);
  (res.socket as any).server.io = io;
  // Define actions inside
  io.on("connection", socket => {
    console.log("Client connected");
    socket.on("send-message", (msg: GameMessage) => {
      console.log("SERVER: Incoming message: ", msg);
      io.emit("receive-message", msg);
    });
  });

  res.end();
}
