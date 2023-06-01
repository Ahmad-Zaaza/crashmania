import React from "react";
import { Slider } from "../Slider/Slider";
import { Stack } from "../Stack";
import { Text } from "../Text";
import { useGameContext } from "@/contexts/GameContext";

const SpeedController = () => {
  const { setSettings, settings } = useGameContext();

  const handleSpeedChange = (speed: number) => {
    setSettings(prev => ({ ...prev, speed }));
  };
  return (
    <div>
      <Slider
        value={[settings.speed]}
        onValueChange={values => handleSpeedChange(values[0])}
        step={1}
        min={1}
        max={5}
      />
      <Stack mt={4} justifyContent="space-between" gap={4}>
        <Text>1x</Text>
        <Text>2x</Text>
        <Text>3x</Text>
        <Text>4x</Text>
        <Text>5x</Text>
      </Stack>
    </div>
  );
};

export default SpeedController;
