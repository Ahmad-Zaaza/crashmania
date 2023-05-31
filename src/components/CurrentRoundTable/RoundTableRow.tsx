import { FcSalesPerformance } from "react-icons/fc";
import { Stack } from "../Stack";
import { Text } from "../Text";

interface IProps {
  name: string;
  prediction: number;
  stake: number;
  crashPoint?: number;
}
const RoundTableRow = ({ prediction, name, stake, crashPoint }: IProps) => {
  return (
    <Stack
      alignItems="center"
      gap={6}
      justifyContent="space-between"
      className={`${
        crashPoint
          ? crashPoint >= prediction
            ? "text-green-700"
            : "text-red-700"
          : ""
      } odd:bg-neutral-700 even:bg-neutral-600`}
      p={4}
    >
      <Text>{name}</Text>
      <Text>x{prediction}</Text>
      <Stack alignItems="center" gap={2}>
        <FcSalesPerformance />
        {crashPoint ? (
          <Text>{crashPoint >= prediction ? prediction * stake : 0}</Text>
        ) : (
          <Text>{stake}</Text>
        )}
      </Stack>
    </Stack>
  );
};

export default RoundTableRow;
