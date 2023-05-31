import React from "react";
import { Box } from "../Box";
import { Stack } from "../Stack";
import { Text } from "../Text";
import { FcSalesPerformance } from "react-icons/fc";
import RoundTableRow from "./RoundTableRow";
import { useGameContext } from "@/contexts/GameContext";

const CurrentRoundTable = () => {
  const { players, bots } = useGameContext();
  return (
    <Box>
      <Stack
        className="bg-neutral-800"
        gap={4}
        justifyContent="space-between"
        p={4}
      >
        <Text>4 Players</Text>
        <Stack alignItems="center" gap={2}>
          <FcSalesPerformance />
          <Text>15000</Text>
        </Stack>
      </Stack>
      <div>
        <RoundTableRow name="Ahmad" multiplier={1.2} stake={150} />
        {bots.map(b => (
          <RoundTableRow
            key={b.id}
            name={b.name}
            multiplier={1.5}
            stake={350}
          />
        ))}
      </div>
    </Box>
  );
};

export default CurrentRoundTable;
