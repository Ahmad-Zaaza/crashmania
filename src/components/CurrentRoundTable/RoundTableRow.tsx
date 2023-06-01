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
            ? "text-green-600"
            : "text-red-500"
          : ""
      } odd:bg-neutral-700 even:bg-neutral-600`}
      px={6}
      py={4}
    >
      <Text className="flex-1" textAlign="center">
        {name}
      </Text>
      <Text className="flex-1" textAlign="center">
        {prediction}x
      </Text>
      <Stack flex={1} justifyContent="center" alignItems="center" gap={2}>
        <FcSalesPerformance />
        {crashPoint ? (
          <Text>
            {crashPoint >= prediction ? (prediction * stake).toFixed(2) : 0}
          </Text>
        ) : (
          <Text>{stake.toFixed(2)}</Text>
        )}
      </Stack>
    </Stack>
  );
};

export default RoundTableRow;
