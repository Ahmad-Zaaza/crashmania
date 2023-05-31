import {
  addBotsEntries,
  addRoundEntry,
  createRound,
  generateBotEntries,
  generateMultiplier,
  updateRounds,
} from "@/utils/gameHelpers";
import { GameRound, GameRoundActions } from "../gameTypes";

export const gameRoundsReducer = (
  state: GameRound[] = [],
  action: GameRoundActions
) => {
  switch (action.type) {
    case "CREATE_ROUND":
      const newRound = createRound();
      return [...state, newRound];
    case "JOIN_ROUND":
      const newRounds = addRoundEntry(
        action.metadata.roundId,
        state,
        action.metadata.entry
      );
      return newRounds;
    case "ADD_BOTS":
      const entries = generateBotEntries(action.metadata.bots);
      const rounds = addBotsEntries(action.metadata.roundId, state, entries);
      return rounds;
    default:
      return state;
  }
};
