export const generateBotInput = () => {
  const prediction = generateMultiplier();
  const stake = +(Math.random() * 10).toFixed(2);

  return { prediction, stake };
};

export const generateMultiplier = () => {
  return +(Math.random() * 10).toFixed(2);
};

export const createplayer = ({
  bot = false,
  name,
  points = 1000,
}: {
  name: string;
  bot: boolean;
  points: number;
}) => {
  return {
    id: Math.random().toString(16).substring(2),
    name,
    points,
    bot,
  };
};
