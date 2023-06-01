import { GameRanking, IGame } from "@/lib/gameTypes";
import { useQuery } from "@tanstack/react-query";

export const gameQueryKeys = {
  all: [{ scope: "game" }] as const,
  round: ({ roundId }: { roundId: string }) =>
    [{ scope: "game", entity: "round", roundId }] as const,
};

async function getGame() {
  return new Promise<IGame | null>((res, rej) => {
    return res(null);
  });
}
async function getGameRankings() {
  return new Promise<GameRanking[]>((res, rej) => {
    return res([]);
  });
}

export const useGetGame = () => {
  return useQuery<IGame | null>(gameQueryKeys.all, getGame);
};
