import React, { useState } from "react";
import StakeInput from "../StakeInput/StakeInput";
import { Box } from "../Box";
import { useGameContext } from "@/contexts/GameContext";

const LeftSide = () => {
  const { players } = useGameContext();
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

  return (
    <Box p={6} paper className="flex-1 rounded-lg">
      <StakeInput
        onChange={handleStakeInput}
        value={stake.toString(10)}
        onPresetClick={onStakePresetClick}
      />
    </Box>
  );
};

export default LeftSide;
