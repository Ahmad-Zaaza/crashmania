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

const LeftSide = () => {
  const { players, setSettings, settings, rounds } = useGameContext();
  const { data: game } = useGetGame();
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
        <Button size="large">PLAY</Button>
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
