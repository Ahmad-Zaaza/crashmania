import React, { useCallback, useState } from "react";
import { Stack } from "../Stack";
import StakeInput from "../StakeInput/StakeInput";
import { Text } from "../Text";
import NextRoundCounter from "../Counters/NextRoundCounter";
import { Button } from "../Button";
import NextPredictionsCounter from "../Counters/NextPredictionsCounter";
import { useCurrentRound } from "@/hooks/useCurrentRound";
import { useGetPlayers } from "@/features/players/playersQueries";
import PredictionInput from "../PredictionInput/PredictionInput";
import {
  useCreateGameRound,
  useUpdateGameRound,
  useUpdatePlayerEntry,
} from "@/features/game/gameMutations";
import { GameRound } from "@/lib/gameTypes";
import { useGetGame } from "@/features/game/gameQueries";

const GameUserInput = () => {
  const { data: players } = useGetPlayers();
  const { data: game } = useGetGame();

  const { currentRound } = useCurrentRound();
  const { mutateAsync: updatePlayerEntry } = useUpdatePlayerEntry();

  const { mutateAsync: createNewRound } = useCreateGameRound();
  const { mutateAsync: updateRound } = useUpdateGameRound();

  const [stake, setStake] = useState(() => {
    return parseFloat(((players?.[0].points as number) / 4).toFixed(2));
  });
  const [prediction, setPrediction] = useState(2.25);

  const [nextRoundCounter, setNextRoundCounter] = useState(false);

  const handleStakeInput = (value: string) => {
    setStake(parseFloat(value));
  };
  const handlePredictionInput = (value: string) => {
    setPrediction(parseFloat(value));
  };

  const onReady = async () => {
    await updatePlayerEntry({
      playerId: players?.[0].id as string,
      prediction,
      stake,
      rounds: game?.rounds as GameRound[],
      roundId: currentRound.id as string,
    });

    setNextRoundCounter(true);
  };

  const onPredictionsCounterFinish = useCallback(async () => {
    if (players) {
      await createNewRound({ players });
    }
  }, [players, createNewRound]);

  const onRoundCounterFinish = useCallback(async () => {
    if (game) {
      await updateRound({
        round: game?.rounds[game.currentRound],
        state: "ongoing",
        rounds: game.rounds,
      });
      setNextRoundCounter(false);
    }
  }, [game, updateRound]);

  return (
    <Stack
      paper
      p={6}
      br="rounded"
      className="relative"
      flexDirection="column"
      gap={6}
    >
      <div>
        <Text mb={4}>Enter your stake</Text>
        <StakeInput
          playerMaxPoints={players?.[0].points as number}
          onChange={handleStakeInput}
          value={stake.toString(10)}
        />
      </div>
      <div>
        <Text mb={4}>Enter your prediction</Text>
        <PredictionInput
          onChange={handlePredictionInput}
          value={prediction.toString(10)}
        />
      </div>
      {nextRoundCounter ? (
        <NextRoundCounter onCounterFinish={onRoundCounterFinish} />
      ) : (
        <Button
          disabled={currentRound.state === "ongoing"}
          onClick={onReady}
          size="large"
        >
          Ready
        </Button>
      )}
      {currentRound.state === "finished" && (
        <NextPredictionsCounter onCounterFinish={onPredictionsCounterFinish} />
      )}
    </Stack>
  );
};

export default GameUserInput;
