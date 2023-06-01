import React, { useMemo } from "react";
import { Box } from "../Box";
import { Stack } from "../Stack";
import { Text } from "../Text";
import { FcSalesPerformance } from "react-icons/fc";
import RoundTableRow from "./RoundTableRow";
import { useGetGame } from "@/features/game/gameQueries";

const CurrentRoundTable = () => {
  const { data: game } = useGetGame();

  const totalStake = useMemo(() => {
    if (game) {
      return game.rounds[game.currentRound].entries.reduce((prev, curr) => {
        return prev + curr.stake;
      }, 0);
    }
  }, [game]);

  if (!game) return null;
  return (
    <Box className="overflow-hidden" br="rounded" paper>
      <Stack
        className="bg-neutral-800"
        gap={4}
        justifyContent="space-between"
        px={6}
        py={4}
      >
        <Text>
          {game?.rounds[game?.currentRound as number].entries.length} Players
        </Text>
        <Stack alignItems="center" gap={2}>
          <FcSalesPerformance />
          <Text>{totalStake?.toFixed(2)}</Text>
        </Stack>
      </Stack>
      <Stack
        className="bg-neutral-500"
        gap={4}
        justifyContent="space-between"
        px={6}
        py={2}
      >
        <Text className="flex-1 font-semibold" textAlign="center">
          Player name
        </Text>
        <Text className="flex-1 font-semibold" textAlign="center">
          Prediction
        </Text>
        <Text className="flex-1 font-semibold" textAlign="center">
          Stake
        </Text>
      </Stack>

      <div className="max-h-[400px] overflow-y-auto">
        {["pending", "ongoing"].includes(
          game?.rounds[game?.currentRound as number].state
        ) && (
          <div>
            {game.rounds[game.currentRound].entries.map(b => (
              <RoundTableRow
                key={b.player.id}
                name={b.player.name}
                prediction={b.prediction}
                stake={b.stake}
              />
            ))}
          </div>
        )}
        {game?.rounds[game?.currentRound as number].state === "finished" && (
          <div>
            {game.rounds[game.currentRound].entries.map(b => (
              <RoundTableRow
                key={b.player.id}
                name={b.player.name}
                prediction={b.prediction}
                stake={b.stake}
                crashPoint={
                  game?.rounds[game?.currentRound as number].multiplier
                }
              />
            ))}
          </div>
        )}
      </div>
    </Box>
  );
};

export default CurrentRoundTable;
