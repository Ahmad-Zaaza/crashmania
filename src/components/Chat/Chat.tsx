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
import { botMessages } from "@/lib/botMessages";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const Chat = () => {
  const [messages, setMessages] = useState<GameMessage[]>([]);
  const { data: players } = useGetPlayers();
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    // socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();
    socket.on("connect", () => {
      setConnected(true);
    });
    socket.on("receive-message", msg => {
      setMessages(prev => [msg, ...prev]);
    });
  };

  const onMessageSend = (msg: GameMessage) => {
    socket.emit("send-message", msg);
  };

  useEffect(() => {
    if (players && connected) {
      const bots = players?.filter(p => p.bot);
      const minInterval = 3000; // Minimum interval in milliseconds
      const maxInterval = 10000; // Maximum interval in milliseconds

      const send = () => {
        const duration =
          Math.random() * (maxInterval - minInterval) + minInterval;

        onMessageSend({
          createdAt: new Date().getTime(),
          player: bots[Math.floor(Math.random() * bots.length)],
          message: botMessages[Math.floor(Math.random() * 30)],
        });
        if (messages.length < 20) {
          setTimeout(send, duration);
        }
      };
      const initialDuration =
        Math.random() * (maxInterval - minInterval) + minInterval;
      const timeout = setTimeout(send, initialDuration);
      return () => clearTimeout(timeout);
    }
  }, [connected, players]);

  return (
    <Box
      p={6}
      br="rounded"
      paper
      style={{ gridTemplateRows: "auto 1fr auto", maxBlockSize: "80vh" }}
      className="grid gap-8 xl:max-w-[450px] "
    >
      <Stack gap={4} alignItems="center" justifyContent="space-between">
        <Text className="font-bold">Chat</Text>

        <Stack alignItems="center" gap={2} className="text-yellow-400">
          <HiUser size={25} />
          <Text>{players?.length} online</Text>
        </Stack>
      </Stack>
      <Stack
        flexDirection="column-reverse"
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
