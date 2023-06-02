import { Text } from "../Text";
import { Stack } from "../Stack";
import CurrentRoundTable from "../CurrentRoundTable/CurrentRoundTable";
import { useGetGame } from "@/features/game/gameQueries";
import { GiAmericanShield, GiTrophy } from "react-icons/gi";
import GameRankingsTable from "../GameRankingsTable/GameRankingsTable";

const LeftSide = () => {
  const { data: game } = useGetGame();

  if (!game) return null;
  return (
    <div className="grid gap-6 rounded-lg grid-cols-[repeat(auto-fit,minmax(400px,_1fr))]">
      <div>
        <Stack mb={4} gap={2} alignItems="center">
          <GiAmericanShield size={25} className="text-primary" />
          <Text className="font-bold">Current Round</Text>
        </Stack>
        <CurrentRoundTable />
      </div>
      <div>
        <Stack mb={4} gap={2} alignItems="center">
          <GiTrophy size={25} className="text-yellow-400" />
          <Text className="font-bold">Rankings</Text>
        </Stack>
        <GameRankingsTable />
      </div>
    </div>
  );
};

export default LeftSide;
