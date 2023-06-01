import React from "react";
import { Slider } from "../Slider/Slider";
import { Stack } from "../Stack";
import { Text } from "../Text";
import { useGameContext } from "@/contexts/GameContext";
import { Box } from "../Box";

const SpeedController = () => {
  const { setSettings, settings } = useGameContext();

  const handleSpeedChange = (speed: number) => {
    setSettings(prev => ({ ...prev, speed }));
  };
  return (
    <Box paper px={6} py={4} br="rounded">
      <Text mb={4}>Game speed</Text>
      <Slider
        value={[settings.speed]}
        onValueChange={values => handleSpeedChange(values[0])}
        step={0.5}
        min={1}
        max={3}
      />
      <Stack mt={4} justifyContent="space-between" gap={4}>
        <Text>1x</Text>
        <Text>1.5x</Text>
        <Text>2x</Text>
        <Text>2.5x</Text>
        <Text>3x</Text>
      </Stack>
    </Box>
  );
};

export default SpeedController;
