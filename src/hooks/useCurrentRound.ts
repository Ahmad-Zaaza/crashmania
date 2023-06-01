import { useGetGame } from "@/features/game/gameQueries";
import { GameRound } from "@/lib/gameTypes";
import { useMemo } from "react";

export const useCurrentRound = () => {
  const { data: game } = useGetGame();

  const currentRound = useMemo(() => {
    return game?.rounds[game?.currentRound] as GameRound;
  }, [game]);

  return { currentRound };
};
