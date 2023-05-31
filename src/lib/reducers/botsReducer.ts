import {
  createPlayer,
} from "@/utils/gameHelpers";
import { BotsActions, GameRound, GameRoundActions, Player } from "../gameTypes";

export const botsReducer = (state: Player[], action: BotsActions) => {
  switch (action.type) {
    case "CREATE_BOT":
      console.log('botr')
      const botsCount = state.filter(p => p.bot).length;
      const player = createPlayer({ bot: true, name: `CPU ${botsCount + 1}` });
      return [...state, player];
    default:
      return state;
  }
};
