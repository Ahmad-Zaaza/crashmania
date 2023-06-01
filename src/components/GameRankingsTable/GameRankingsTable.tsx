import React, { useMemo } from "react";
import { Box } from "../Box";
import { Stack } from "../Stack";
import { Text } from "../Text";
import GameRankingRow from "./GameRankingRow";
import { useGetPlayers } from "@/features/players/playersQueries";
import { useGetGame } from "@/features/game/gameQueries";

const GameRankingsTable = () => {
  const { data: players } = useGetPlayers();
  const { data: game } = useGetGame();

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
        <Text className="flex-1" textAlign="center">
          Rounds played:{" "}
          <span className="text-xl font-extrabold align-middle text-primary">
            {(game?.rounds.length as number) - 1}
          </span>
        </Text>
        {/* <Text className="flex-1" textAlign="center">
          Stake
        </Text> */}
      </Stack>
      <Stack
        className="bg-neutral-500"
        gap={6}
        justifyContent="space-between"
        px={6}
        py={2}
      >
        <Text className="font-semibold">#</Text>
        <span className="w-[24px]"></span>
        <Text className="flex-[2] font-semibold">Player</Text>
        <Text className="flex-1 font-semibold">Points</Text>
        <Text className="flex-1 font-semibold" textAlign="center">Earnings</Text>
      </Stack>
      <div className="max-h-[300px] overflow-y-auto">
        {sortedPlayers.map((r, i) => (
          <GameRankingRow key={r.id} player={r} index={i} />
        ))}
      </div>
    </Box>
  );
};

export default GameRankingsTable;
