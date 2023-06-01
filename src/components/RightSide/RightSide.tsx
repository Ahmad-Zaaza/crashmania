import React from "react";
import CrashCanvas from "../CrashCanvas/CrashCanvas";
import GameUserInput from "../GameUserInput/GameUserInput";

const RightSide = () => {
  return (
    <div className="grid gap-8 grid-cols-1 lg:grid-cols-[2fr_1fr]">
      <CrashCanvas />
      <GameUserInput />
    </div>
  );
};

export default RightSide;
