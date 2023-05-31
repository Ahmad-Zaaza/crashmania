import { Player } from "@/lib/gameTypes";
import { useQuery } from "@tanstack/react-query";

export const playersQueryKeys = {
  all: [{ scope: "players" }] as const,
};

async function getPlayers() {
  return new Promise<Player[]>((res, rej) => {
    return res([]);
  });
}

export const useGetPlayers = () => {
  return useQuery(playersQueryKeys.all, getPlayers);
};
