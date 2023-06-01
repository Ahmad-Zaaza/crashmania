import React from "react";
import RightSide from "../RightSide/RightSide";
import LeftSide from "../LeftSide/LeftSide";
import { Text } from "../Text";
import SpeedController from "../SpeedController/SpeedController";

const GameScreen = () => {
  // const { dispatchGameRounds, bots, rounds, activeRound } = useGameContext();

  // useEffect(() => {
  //   dispatchGameRounds({ type: "CREATE_ROUND" });
  // }, []);

  // useEffect(() => {
  //   if (rounds.length > 0) {
  //     dispatchGameRounds({
  //       type: "ADD_BOTS",
  //       metadata: {
  //         roundId: rounds[activeRound].id,
  //         bots,
  //       },
  //     });
  //   }
  // }, [rounds, bots, activeRound]);
  return (
    <main className="max-w-[1366px] mx-auto px-4 mt-[80px] flex flex-col gap-8 isolate pt-8 pb-28 md:pb-16 gap-8">
      <RightSide />
      <div>
        <Text mb={4}>Speed</Text>
        <SpeedController />
      </div>
      <LeftSide />
    </main>
  );
};

export default GameScreen;
