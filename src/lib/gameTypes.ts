export type Player = {
  id: string;
  name: string;
  points: number;
  bot: boolean;
};

// when we create a game we should initialize the bots.
// create game steps:
// create bots.
// create round.
//  :create bots entries
//  :create multiplier
//

/**
 * each game round has information like:
 * entries: {playerName:string, stake:number, prediction: number}[];
 * multiplier:number;
 */

export interface GameRound {
  id: string;
  state: "pending" | "finished" | "ongoing";
  entries: { player: Player; stake: number; prediction: number }[];
  multiplier: number | null;
}

export interface RoundEntry {
  player: Player;
  stake: number;
  prediction: number;
}
// on game start we should create a new game round.. taking our input and populating bots inputs automatically
// and creating a multiplier
export type GameRoundActions =
  | {
      type: "CREATE_ROUND";
    }
  | {
      type: "JOIN_ROUND";
      metadata: {
        entry: RoundEntry;
        roundId: string;
      };
    }
  | {
      type: "ADD_BOTS";
      metadata: {
        bots: Player[];
        roundId: string;
      };
    };
export type BotsActions = {
  type: "CREATE_BOT";
};

export type GameSettings = {
  speed: number;
};

export interface IGame {
  gameId: string;
  rounds: GameRound[];
  players: Player[];
  bots: Player[];
}

export interface CreateGameProps {
  player: Player;
  noOfBots: number;
}
export interface UpdatePlayerEntryProps {
  roundId: string;
  rounds: GameRound[];
  playerId: string;
  prediction: number;
  stake: number;
}
