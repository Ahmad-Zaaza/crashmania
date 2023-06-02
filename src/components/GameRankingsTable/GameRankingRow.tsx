import { GameRanking } from "@/lib/gameTypes";
import { Stack } from "../Stack";
import { Text } from "../Text";
import { GiAchievement } from "react-icons/gi";

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
        !player.bot ? "text-yellow-400" : ""
      } odd:bg-neutral-700 even:bg-neutral-600`}
      py={4}
      px={6}
    >
      <Text>{index + 1}</Text>
      <div className="w-[24px]">
        {index === 0 && <GiAchievement className="text-yellow-400" size={24} />}
      </div>
      <Text className="flex-[2]">{player.name}</Text>
      <Text className="flex-1">{player.points}</Text>
      <Text className="flex-1" textAlign="center">
        {player.earnings}
      </Text>
    </Stack>
  );
};

export default GameRankingRow;
