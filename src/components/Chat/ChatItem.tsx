import { Player } from "@/lib/gameTypes";
import React from "react";
import { Avatar, AvatarFallback } from "../Avatar";
import { Stack } from "../Stack";
import { Text } from "../Text";

interface IProps {
  player: Player;
  message: string;
  createdAt: string;
}

const ChatItem = ({ player, createdAt, message }: IProps) => {
  return (
    <div>
      <Stack gap={2}>
        <Avatar className="bg-primary" size="small">
          <AvatarFallback>{player.name[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <Text variant="bodyLarge" className="flex-1 font-bold text-slate-300">
          {player.name}
        </Text>
        <Text variant="bodySmall">{createdAt}</Text>
      </Stack>
      <div className="ms-[30px] mt-2 py-2 px-3 flex items-center rounded-lg bg-primary bg-opacity-20">
        <Text variant="bodyMedium">{message}</Text>
      </div>
    </div>
  );
};

export default ChatItem;
