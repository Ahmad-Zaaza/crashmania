import React, { useState } from "react";
import StakeInput from "../StakeInput/StakeInput";
import { useGameContext } from "@/contexts/GameContext";
import { Text } from "../Text";
import { Stack } from "../Stack";
import { Button } from "../Button";
import { Divider } from "../Divider";
import CurrentRoundTable from "../CurrentRoundTable/CurrentRoundTable";
import SpeedController from "../SpeedController/SpeedController";

const LeftSide = () => {
  const { players, setSettings, settings } = useGameContext();
  const [stake, setStake] = useState(() => {
    return parseFloat((players[0].points / 4).toFixed(2));
  });

  const handleStakeInput = (value: string) => {
    setStake(parseFloat(value));
  };

  const onStakePresetClick = (type: "half" | "double" | "max") => {
    switch (type) {
      case "half":
        if (stake / 2 < 10) {
          setStake(10);
        } else {
          setStake(+(stake / 2).toFixed(2));
        }
        break;
      case "max":
        setStake(players[0].points);
        break;
      case "double":
        if (stake * 2 > players[0].points) {
          setStake(players[0].points);
        } else {
          setStake(stake * 2);
        }
        break;
      default:
        break;
    }
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
            onChange={handleStakeInput}
            value={stake.toString(10)}
            onPresetClick={onStakePresetClick}
          />
        </div>
        <div>
          <Text mb={4}>Enter your prediction</Text>
          <StakeInput
            onChange={handleStakeInput}
            value={stake.toString(10)}
            onPresetClick={onStakePresetClick}
          />
        </div>
        <Button size="large">PLAY</Button>
      </Stack>
      <Divider />
      <CurrentRoundTable />
      <Divider />
      <div>
        <Text mb={4}>Speed</Text>
        <SpeedController value={settings.speed} onChange={handleSpeedChange} />
      </div>
    </Stack>
  );
};

export default LeftSide;
