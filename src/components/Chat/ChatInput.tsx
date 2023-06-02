import React from "react";
import { Stack } from "../Stack";
import { Input } from "../Input";
import { Button } from "../Button";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { useGetPlayers } from "@/features/players/playersQueries";
import { useForm, SubmitHandler } from "react-hook-form";
import { GameMessage, Player } from "@/lib/gameTypes";
interface IProps {
  onMessageSend: (msg: GameMessage) => void;
}

type Form = {
  message: string;
};

const ChatInput = ({ onMessageSend }: IProps) => {
  const { register, handleSubmit, reset } = useForm<Form>();

  const { data: player } = useGetPlayers({
    select: players => players.find(p => !p.bot),
  });

  const onSubmit: SubmitHandler<Form> = data => {
    onMessageSend({
      createdAt: new Date().getTime(),
      player: player as Player,
      message: data.message,
    });
    reset({ message: "" });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack alignItems="center" gap={2} justifyContent="space-between">
        <Input
          {...register("message")}
          placeholder="Enter your message..."
          className="flex-1"
        />
        <Button type="submit" theme="primary">
          Send
        </Button>
      </Stack>
    </form>
  );
};

export default ChatInput;
