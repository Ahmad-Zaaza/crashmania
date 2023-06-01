import { GameRanking } from "@/lib/gameTypes";
import { Stack } from "../Stack";
import { Text } from "../Text";

interface IProps {
  player: GameRanking["player"];
  index: number;
}
const GameRankingRow = ({ player, index }: IProps) => {
  return (
    <Stack
      alignItems="center"
      gap={6}
      justifyContent="space-between"
      className={`${
        index === 0 ? "text-green-500" : ""
      } odd:bg-neutral-700 even:bg-neutral-600`}
      p={4}
    >
      <Text>{index + 1}</Text>
      <Text>{player.name}</Text>
      <Text>{player.points}</Text>
      <Text>{player.earnings}</Text>
    </Stack>
  );
};

export default GameRankingRow;
