import React from "react";
import { Text } from "../Text";
import { useGetPlayers } from "@/features/players/playersQueries";
import { Stack } from "../Stack";
import { HiUser } from "react-icons/hi";
import { Box } from "../Box";
import ChatInput from "./ChatInput";
import ChatItem from "./ChatItem";

const Chat = () => {
  const { data: players } = useGetPlayers();
  return (
    <Box
      p={6}
      br="rounded"
      paper
      style={{ gridTemplateRows: "auto 1fr auto" }}
      className="grid gap-8 basis-[350px]"
    >
      <Stack gap={4} alignItems="center" justifyContent="space-between">
        <Text className="font-bold">Chat</Text>

        <Stack alignItems="center" gap={2} className="text-yellow-400">
          <HiUser size={25} />
          <Text>{players?.length} online</Text>
        </Stack>
      </Stack>
      <Stack flexDirection="column" gap={6}>
        <ChatItem createdAt="Now" message="Hello world" player={players[0]} />
        <ChatItem createdAt="Now" message="Hello world" player={players[0]} />
      </Stack>
      <ChatInput />
    </Box>
  );
};

export default Chat;
