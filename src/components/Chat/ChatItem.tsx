import { GameMessage } from "@/lib/gameTypes";
import React from "react";
import { Avatar, AvatarFallback } from "../Avatar";
import { Stack } from "../Stack";
import { Text } from "../Text";
import { format } from "date-fns";

interface IProps {
  message: GameMessage;
}

const ChatItem = ({ message: { createdAt, message, player } }: IProps) => {
  return (
    <div>
      <Stack gap={2}>
        <Avatar className="bg-primary" size="small">
          <AvatarFallback>{player.name[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <Text
          variant="bodyLarge"
          className={`${
            !player.bot ? "text-yellow-400" : "text-slate-300"
          } flex-1 line-clamp-1 max-w-[200px] font-bold`}
        >
          {player.name}
        </Text>
        <Text className="whitespace-nowrap" variant="bodySmall">
          {format(new Date(createdAt), "hh:mm aa")}
        </Text>
      </Stack>
      <div className="ms-[30px]  mt-2 py-2 px-3 inline-flex items-center rounded-lg bg-primary bg-opacity-20">
        <Text variant="bodyMedium">{message}</Text>
      </div>
    </div>
  );
};

export default ChatItem;
