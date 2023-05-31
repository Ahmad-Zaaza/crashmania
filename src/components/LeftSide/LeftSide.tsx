import React, { useEffect, useState } from "react";
import StakeInput from "../StakeInput/StakeInput";
import { useGameContext } from "@/contexts/GameContext";
import { Text } from "../Text";
import { Stack } from "../Stack";
import { Button } from "../Button";
import { Divider } from "../Divider";
import CurrentRoundTable from "../CurrentRoundTable/CurrentRoundTable";
import SpeedController from "../SpeedController/SpeedController";
import PredictionInput from "../PredictionInput/PredictionInput";
import { useGetGame } from "@/features/game/gameQueries";
import { useUpdatePlayerEntry } from "@/features/game/gameMutations";
import { GameRound } from "@/lib/gameTypes";

const LeftSide = () => {
  const { setSettings, settings } = useGameContext();
  const { data: game } = useGetGame();

  const { mutateAsync: updatePlayerEntry } = useUpdatePlayerEntry();

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

  const handleSpeedChange = (speed: number) => {
    setSettings(prev => ({ ...prev, speed }));
  };

  const onPlay = async () => {
    await updatePlayerEntry({
      playerId: game?.players[0].id as string,
      prediction,
      stake,
      rounds: game?.rounds as GameRound[],
      roundId: game?.rounds[game?.currentRound as number].id as string,
    });
  };

  return (
    <Stack
      flexDirection="column"
      p={6}
      gap={4}
      paper
      className="flex-1 rounded-lg"
    >
      <Stack flexDirection="column" gap={6}>
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
        <Button onClick={onPlay} size="large">
          PLAY
        </Button>
      </Stack>
      <Divider />
      {game && <CurrentRoundTable />}
      <Divider />
      <div>
        <Text mb={4}>Speed</Text>
        <SpeedController value={settings.speed} onChange={handleSpeedChange} />
      </div>
    </Stack>
  );
};

export default LeftSide;
