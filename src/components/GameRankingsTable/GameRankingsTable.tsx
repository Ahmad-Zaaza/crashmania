import React, { useMemo } from "react";
import { Box } from "../Box";
import { Stack } from "../Stack";
import { Text } from "../Text";
import GameRankingRow from "./GameRankingRow";
import { useGetPlayers } from "@/features/players/playersQueries";

const GameRankingsTable = () => {
  const { data: players } = useGetPlayers();

  const sortedPlayers = useMemo(() => {
    if (!players) return [];
    const newPlayers = [...players];
    return newPlayers.sort((a, b) => b.points - a.points);
  }, [players]);
  return (
    <Box paper br="rounded" className="overflow-hidden">
      <Stack
        className="bg-neutral-800"
        gap={4}
        justifyContent="space-between"
        py={4}
        px={6}
      >
        <Text>#</Text>
        <Text>Player</Text>
        <Text>Points</Text>
        <Text>Earnings</Text>
      </Stack>
      {sortedPlayers.map((r, i) => (
        <GameRankingRow key={r.id} player={r} index={i} />
      ))}
    </Box>
  );
};

export default GameRankingsTable;
