import { createRound, generateMultiplier } from "@/utils/gameHelpers";
import { GameRound, GameRoundActions } from "../gameTypes";

export const gameRoundsReducer = (
  state: GameRound[] = [],
  action: GameRoundActions
) => {
  switch (action.type) {
    case "CREATE_ROUND":
      const newRound = createRound();
      return [...state, newRound];
    default:
      return state;
  }
};
