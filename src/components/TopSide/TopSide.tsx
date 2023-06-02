import React from "react";
import CrashCanvas from "../CrashCanvas/CrashCanvas";
import GameUserInput from "../GameUserInput/GameUserInput";
import { FcSettings } from "react-icons/fc";
import SpeedController from "../SpeedController/SpeedController";
import { Stack } from "../Stack";
import { Text } from "../Text";

const RightSide = () => {
  return (
    <div className="grid gap-8 grid-cols-1 lg:grid-cols-[2fr_1fr]">
      <CrashCanvas />
      <Stack flexDirection="column" gap={8}>
        <GameUserInput />
        {/* <div>
          <Stack mb={4} gap={2} alignItems="center">
            <FcSettings size={25} className="text-primary" />
            <Text className="font-bold">Game settings</Text>
          </Stack>
          <SpeedController />
        </div> */}
      </Stack>
    </div>
  );
};

export default RightSide;
