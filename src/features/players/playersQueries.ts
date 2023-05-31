import { Player } from "@/lib/gameTypes";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export const playersQueryKeys = {
  all: [{ scope: "players" }] as const,
};

async function getPlayers() {
  return new Promise<Player[]>((res, rej) => {
    return res([]);
  });
}

export const useGetPlayers = <SelectData = Player[], Error = unknown>(
  options?: UseQueryOptions<Player[], Error, SelectData>
) => {
  return useQuery<Player[], Error, SelectData>(
    playersQueryKeys.all,
    getPlayers,
    options
  );
};
