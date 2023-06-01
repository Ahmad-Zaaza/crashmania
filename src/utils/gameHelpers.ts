import { GameRound, Player, RoundEntry } from "@/lib/gameTypes";

export const generateBotActions = (maxPoints: number) => {
  const prediction = generateMultiplier();
  const stake = parseFloat((Math.random() * (maxPoints / 1.5)).toFixed(2));

  return { prediction, stake };
};
export const generateBotEntries = (bots: Player[]) => {
  const botsEntries = bots.map(b => ({
    player: b,
    ...generateBotActions(b.points),
  }));

  return botsEntries;
};

export const generateMultiplier = () => {
  return parseFloat((Math.random() * 10).toFixed(2));
};

export const updateRounds = (
  roundId: string,
  rounds: GameRound[],
  props: Omit<GameRound, "id">
): GameRound[] => {
  const roundsCopy = [...rounds];
  const roundIndex = roundsCopy.findIndex(r => r.id === roundId);

  if (roundIndex !== -1) {
    // get the round
    const round = rounds[roundIndex];
    // create new round
    const newRound = { ...round, ...props };
    roundsCopy.splice(roundIndex, 1, newRound);
    return roundsCopy;
  }
  return rounds;
};

export const addRoundEntry = (
  roundId: string,
  rounds: GameRound[],
  newEntry: RoundEntry
): GameRound[] => {
  const roundsCopy = [...rounds];
  const roundIndex = roundsCopy.findIndex(r => r.id === roundId);

  if (roundIndex !== -1) {
    // get the round
    const round = rounds[roundIndex];
    // create new round
    const newRound: GameRound = {
      ...round,
      entries: [...round.entries, newEntry],
    };
    roundsCopy.splice(roundIndex, 1, newRound);
    return roundsCopy;
  }
  return rounds;
};
export const addBotsEntries = (
  roundId: string,
  rounds: GameRound[],
  entries: RoundEntry[]
): GameRound[] => {
  const roundsCopy = [...rounds];
  const roundIndex = roundsCopy.findIndex(r => r.id === roundId);

  if (roundIndex !== -1) {
    // get the round
    const round = rounds[roundIndex];
    // create new round
    const newRound: GameRound = {
      ...round,
      entries: [...round.entries, ...entries],
    };
    roundsCopy.splice(roundIndex, 1, newRound);
    return roundsCopy;
  }
  return rounds;
};

export const generateUUID = () => {
  return Math.random().toString(16).substring(2);
};
