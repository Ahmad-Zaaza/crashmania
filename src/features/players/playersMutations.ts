import { CreatePlayerProps, Player } from "@/lib/gameTypes";
import { generateUUID } from "@/utils/gameHelpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { playersQueryKeys } from "./playersQueries";

async function createPlayer({ bot, name, points }: CreatePlayerProps) {
  return new Promise<Player>(res => {
    return res({
      id: generateUUID(),
      name,
      points,
      bot,
    });
  });
}
async function createBots({ count }: { count: number }) {
  return new Promise<Player[]>(res => {
    const bots: Player[] = [];
    for (let index = 0; index < count; index++) {
      bots.push({
        id: generateUUID(),
        points: 1000,
        bot: true,
        name: `CPU ${index + 1}`,
      });
    }
    return res(bots);
  });
}
export const useCreatePlayer = () => {
  const queryClient = useQueryClient();
  return useMutation(createPlayer, {
    onSuccess: player => {
      const oldPlayers = queryClient.getQueryData<Player[]>(
        playersQueryKeys.all
      );
      if (oldPlayers) {
        queryClient.setQueryData(playersQueryKeys.all, [...oldPlayers, player]);
      }
    },
  });
};
export const useCreateBots = () => {
  const queryClient = useQueryClient();
  return useMutation(createBots, {
    onSuccess: bots => {
      const oldPlayers = queryClient.getQueryData<Player[]>(
        playersQueryKeys.all
      );
      if (oldPlayers) {
        queryClient.setQueryData(playersQueryKeys.all, [
          ...oldPlayers,
          ...bots,
        ]);
      }
    },
  });
};
