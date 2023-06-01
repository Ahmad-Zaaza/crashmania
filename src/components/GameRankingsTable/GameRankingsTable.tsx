import { useGameRankings } from "@/features/game/gameQueries";
import React from "react";
import { Box } from "../Box";
import { Stack } from "../Stack";
import { Text } from "../Text";
import GameRankingRow from "./GameRankingRow";

const GameRankingsTable = () => {
  const { data: rankings } = useGameRankings();
  return (
    <Box>
      <Stack
        className="bg-neutral-800"
        gap={4}
        justifyContent="space-between"
        p={4}
      >
        <Text>#</Text>
        <Text>Player</Text>
        <Text>Points</Text>
        <Text>Earnings</Text>
      </Stack>
      {rankings &&
        rankings.map((r, i) => (
          <GameRankingRow key={r.player.id} player={r.player} index={i} />
        ))}
    </Box>
  );
};

export default GameRankingsTable;
