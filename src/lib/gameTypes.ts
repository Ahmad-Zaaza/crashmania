export type Player = {
  id: string;
  name: string;
  points: number;
  bot: boolean;
  earnings: number;
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
  multiplier: number;
  crashTime: number;
}

export interface RoundEntry {
  player: Player;
  stake: number;
  prediction: number;
}
// on game start we should create a new game round.. taking our input and populating bots inputs automatically
// and creating a multiplier

export type GameSettings = {
  speed: number;
};

export interface IGame {
  gameId: string;
  rounds: GameRound[];
  players: Player[];
  bots: Player[];
  currentRound: number;
}

export type GameRanking = { player: Player };

export interface CreateGameProps {
  players: Player[];
}
export interface UpdatePlayerEntryProps {
  roundId: string;
  rounds: GameRound[];
  playerId: string;
  prediction: number;
  stake: number;
}

export interface CreatePlayerProps {
  name: string;
  points: number;
  bot: boolean;
}
export interface CreateGameRoundProps {
  players: Player[];
}
export interface UpdateGameRoundProps {
  round: GameRound;
  rounds: GameRound[];
  state: GameRound["state"];
}

export type GameMessage = {
  player: Player;
  message: string;
  createdAt: number;
};
