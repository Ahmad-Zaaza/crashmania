import { IGame } from "@/lib/gameTypes";
import { useQuery } from "@tanstack/react-query";

export const gameQueryKeys = {
  all: [{ scope: "game" }] as const,
};

async function getGame() {
  return new Promise<IGame | null>((res, rej) => {
    return res(null);
  });
}

export const useGetGame = () => {
  return useQuery<IGame | null>(gameQueryKeys.all, getGame);
};
