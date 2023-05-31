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
//  :create bots predictions
//  :create multiplier
//

/**
 * each game round has information like:
 * predictions: {playerName:string, stake:number, prediction: number}[];
 * multiplier:number;
 */

export interface GameRound {
  players: Player[];
  predictions: { playerName: string; stake: number; prediction: number }[];
  multiplier: number;
}
// on game start we should create a new game round.. taking our input and populating bots inputs automatically
// and creating a multiplier
export type GameRoundActions = {
  type: "CREATE_ROUND";
  metadata: GameRound;
};

export type GameSettings = {
  speed: number;
};
