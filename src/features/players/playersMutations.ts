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

async function updatePlayer({
  player,
  newPoints,
}: {
  player: Player;
  newPoints: number;
}) {
  return new Promise<Player>(res => {
    return res({ ...player, points: newPoints });
  });
}
export const useCreatePlayer = () => {
  const queryClient = useQueryClient();
  return useMutation(createPlayer, {
    onSuccess: player => {
      const oldPlayers =
        queryClient.getQueryData<Player[]>(playersQueryKeys.all) || [];
      if (oldPlayers) {
        queryClient.setQueryData(playersQueryKeys.all, [...oldPlayers, player]);
      }
    },
  });
};
export const useUpdatePlayer = () => {
  const queryClient = useQueryClient();
  return useMutation(updatePlayer, {
    onSuccess: newPlayer => {
      const playersCopy = queryClient.getQueryData<Player[]>(
        playersQueryKeys.all
      );
      if (playersCopy) {
        const playerIndex = playersCopy.findIndex(p => p.id === newPlayer.id);
        if (playerIndex !== -1) {
          playersCopy.splice(playerIndex, 1, newPlayer);
          queryClient.setQueryData(playersQueryKeys.all, playersCopy);
        }
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
