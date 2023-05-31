import { GameRound } from "@/lib/gameTypes";

export const generateBotInput = () => {
  const prediction = generateMultiplier();
  const stake = +(Math.random() * 10).toFixed(2);

  return { prediction, stake };
};

export const generateMultiplier = () => {
  return +(Math.random() * 10).toFixed(2);
};

export const createPlayer = ({
  bot = false,
  name,
  points = 1000,
}: {
  name: string;
  bot: boolean;
  points?: number;
}) => {
  return {
    id: generateUUID(),
    name,
    points,
    bot,
  };
};

export const createRound = (): GameRound => {
  return {
    id: generateUUID(),
    state: "pending",
    multiplier: null,
    players: [],
    predictions: [],
  };
};

export const generateUUID = () => {
  return Math.random().toString(16).substring(2);
};
