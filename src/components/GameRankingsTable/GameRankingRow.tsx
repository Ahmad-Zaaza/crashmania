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
      className="odd:bg-neutral-700 even:bg-neutral-600"
      p={4}
    >
      <Text>{index}</Text>
      <Text>{player.name}</Text>
      <Text>{player.earnings}</Text>
      <Text>{player.points}</Text>
    </Stack>
  );
};

export default GameRankingRow;
