import React, { useEffect, useState } from "react";
import { Text } from "../Text";
import { useGetPlayers } from "@/features/players/playersQueries";
import { Stack } from "../Stack";
import { HiUser } from "react-icons/hi";
import { Box } from "../Box";
import ChatInput from "./ChatInput";
import ChatItem from "./ChatItem";
import io, { Socket } from "socket.io-client";
import { GameMessage } from "@/lib/gameTypes";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const Chat = () => {
  const [messages, setMessages] = useState<GameMessage[]>([]);
  const { data: players } = useGetPlayers();
  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    // We just call it because we don't need anything else out of it
    await fetch("/api/socket");
    socket = io();
    socket.on("receive-message", msg => {
      setMessages(prev => [...prev, msg]);
    });
  };

  const onMessageSend = (msg: GameMessage) => {
    console.log("Sending message");
    socket.emit("send-message", msg);
  };

  return (
    <Box
      p={6}
      br="rounded"
      paper
      style={{ gridTemplateRows: "auto 1fr auto", maxBlockSize: "80vh" }}
      className="grid gap-8 "
    >
      <Stack gap={4} alignItems="center" justifyContent="space-between">
        <Text className="font-bold">Chat</Text>

        <Stack alignItems="center" gap={2} className="text-yellow-400">
          <HiUser size={25} />
          <Text>{players?.length} online</Text>
        </Stack>
      </Stack>
      <Stack
        flexDirection="column"
        style={{
          maxBlockSize: "100%",
          overflowY: "auto",
          paddingInlineEnd: "16px",
          marginInlineEnd: "-16px",
        }}
        gap={6}
      >
        {messages.length === 0 && (
          <Text textAlign="center" className="text-gray-400">
            No messages to show...
          </Text>
        )}
        {messages.map(m => (
          <ChatItem message={m} key={m.createdAt} />
        ))}
      </Stack>
      <ChatInput onMessageSend={onMessageSend} />
    </Box>
  );
};

export default Chat;
