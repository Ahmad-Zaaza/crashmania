import React from "react";
import { Box } from "../Box";
import { Stack } from "../Stack";
import { Text } from "../Text";
import { FcSalesPerformance } from "react-icons/fc";
import RoundTableRow from "./RoundTableRow";
import { useGameContext } from "@/contexts/GameContext";

const CurrentRoundTable = () => {
  const { players, bots, rounds, activeRound } = useGameContext();
  return (
    <Box>
      <Stack
        className="bg-neutral-800"
        gap={4}
        justifyContent="space-between"
        p={4}
      >
        <Text>{rounds[activeRound].entries.length} Players</Text>
        <Stack alignItems="center" gap={2}>
          <FcSalesPerformance />
          <Text>15000</Text>
        </Stack>
      </Stack>
      <div>
        <RoundTableRow name="Ahmad" multiplier={1.2} stake={150} />
        {rounds[activeRound].entries.map(b => (
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
