import { FcSalesPerformance } from "react-icons/fc";
import { Stack } from "../Stack";
import { Text } from "../Text";

interface IProps {
  name: string;
  multiplier: number;
  stake: number;
}
const RoundTableRow = ({ multiplier, name, stake }: IProps) => {
  return (
    <Stack
      alignItems="center"
      gap={6}
      justifyContent="space-between"
      className="odd:bg-neutral-700 even:bg-neutral-600"
      p={4}
    >
      <Text>{name}</Text>
      <Text>x{multiplier}</Text>
      <Stack alignItems="center" gap={2}>
        <FcSalesPerformance />
        <Text>{stake}</Text>
      </Stack>
    </Stack>
  );
};

export default RoundTableRow;
