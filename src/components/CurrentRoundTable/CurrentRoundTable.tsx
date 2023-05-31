import React from "react";
import { Box } from "../Box";
import { Stack } from "../Stack";
import { Text } from "../Text";
import { FcSalesPerformance } from "react-icons/fc";
import RoundTableRow from "./RoundTableRow";
import { useGetGame } from "@/features/game/gameQueries";

const CurrentRoundTable = () => {
  const { data: game } = useGetGame();
  console.log({ game });
  return (
    <Box>
      <Stack
        className="bg-neutral-800"
        gap={4}
        justifyContent="space-between"
        p={4}
      >
        <Text>
          {game?.rounds[game?.currentRound as number].entries.length} Players
        </Text>
        <Stack alignItems="center" gap={2}>
          <FcSalesPerformance />
          <Text>15000</Text>
        </Stack>
      </Stack>
      {game?.rounds[game?.currentRound as number].state === "pending" && (
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
              crashPoint={game?.rounds[game?.currentRound as number].multiplier}
            />
          ))}
        </div>
      )}
    </Box>
  );
};

export default CurrentRoundTable;
