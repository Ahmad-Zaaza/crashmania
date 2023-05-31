import React from "react";
import { Box } from "../Box";
import { Stack } from "../Stack";
import { Text } from "../Text";
import { FcSalesPerformance } from "react-icons/fc";
import RoundTableRow from "./RoundTableRow";
import { useGetGame } from "@/features/game/gameQueries";

const CurrentRoundTable = () => {
  const { data: game } = useGetGame();
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
      <div>
        {game?.rounds[game?.currentRound as number].entries.map(b => (
          <RoundTableRow
            key={b.player.id}
            name={b.player.name}
            multiplier={b.prediction}
            stake={b.stake}
          />
        ))}
      </div>
    </Box>
  );
};

export default CurrentRoundTable;
