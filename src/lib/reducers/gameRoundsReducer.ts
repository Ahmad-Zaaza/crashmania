import { GameRound, GameRoundActions } from "../gameTypes";

export const gameRoundsReducer = (
  state: GameRound[] = [],
  action: GameRoundActions
) => {
  switch (action.type) {
    case "CREATE_ROUND":
        
    default:
      return state;
  }
};
