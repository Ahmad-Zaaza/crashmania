import { useCallback, useState } from "react";
import StakeInput from "../StakeInput/StakeInput";
import { Text } from "../Text";
import { Stack } from "../Stack";
import { Button } from "../Button";
import { Divider } from "../Divider";
import CurrentRoundTable from "../CurrentRoundTable/CurrentRoundTable";
import SpeedController from "../SpeedController/SpeedController";
import PredictionInput from "../PredictionInput/PredictionInput";
import { useGetGame } from "@/features/game/gameQueries";
import {
  useCreateGameRound,
  useUpdateGameRound,
  useUpdatePlayerEntry,
} from "@/features/game/gameMutations";
import { GameRound } from "@/lib/gameTypes";
import NextPredictionsCounter from "../Counters/NextPredictionsCounter";
import NextRoundCounter from "../Counters/NextRoundCounter";
import { GiRocket, GiTrophy } from "react-icons/gi";
import GameRankingsTable from "../GameRankingsTable/GameRankingsTable";
const LeftSide = () => {
  const { data: game } = useGetGame();

  const { mutateAsync: updatePlayerEntry } = useUpdatePlayerEntry();

  const { mutateAsync: createNewRound } = useCreateGameRound();
  const { mutateAsync: updateRound } = useUpdateGameRound();

  const [nextRoundCounter, setNextRoundCounter] = useState(false);

  const [stake, setStake] = useState(() => {
    return parseFloat(((game?.players[0].points as number) / 4).toFixed(2));
  });
  const [prediction, setPrediction] = useState(2.25);

  const handleStakeInput = (value: string) => {
    setStake(parseFloat(value));
  };
  const handlePredictionInput = (value: string) => {
    setPrediction(parseFloat(value));
  };

  const onReady = async () => {
    await updatePlayerEntry({
      playerId: game?.players[0].id as string,
      prediction,
      stake,
      rounds: game?.rounds as GameRound[],
      roundId: game?.rounds[game?.currentRound as number].id as string,
    });

    setNextRoundCounter(true);
  };

  const onPredictionsCounterFinish = useCallback(async () => {
    if (game) {
      await createNewRound({ players: [...game.players, ...game.bots] });
    }
  }, [game, createNewRound]);

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

  if (!game) return null;
  return (
    <div
      // flexDirection="column"

      className="grid gap-6 rounded-lg grid-cols-[repeat(auto-fill,minmax(350px,_1fr))]"
    >
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
            playerMaxPoints={game?.players[0].points as number}
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
            disabled={game.rounds[game?.currentRound].state === "ongoing"}
            onClick={onReady}
            size="large"
          >
            Ready
          </Button>
        )}
        {game.rounds[game?.currentRound].state === "finished" && (
          <NextPredictionsCounter
            onCounterFinish={onPredictionsCounterFinish}
          />
        )}
      </Stack>
      <div>
        <Stack mb={4} gap={2} alignItems="center">
          <GiRocket size={25} className="text-primary" />
          <Text>Current Round</Text>
        </Stack>
        <CurrentRoundTable />
      </div>
      <div>
        <Stack mb={4} gap={2} alignItems="center">
          <GiTrophy size={25} className="text-yellow-400" />
          <Text>Rankings</Text>
        </Stack>
        <GameRankingsTable />
      </div>
    </div>
  );
};

export default LeftSide;
