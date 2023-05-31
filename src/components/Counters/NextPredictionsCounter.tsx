import { useEffect } from "react";
import { Text } from "../Text";
import { useCountdown } from "usehooks-ts";

interface IProps {
  onCounterFinish: VoidFunction;
}

const NextPredictionsCounter = ({ onCounterFinish }: IProps) => {
  const [count, { startCountdown }] = useCountdown({
    countStart: 10,
    intervalMs: 1000,
  });

  useEffect(() => {
    startCountdown();
  }, []);

  useEffect(() => {
    if (count === 0) {
      onCounterFinish();
    }
  }, [count, onCounterFinish]);
  return (
    <div className="absolute inset-0 flex items-center justify-center z-[2] bg-neutral-950 opacity-95">
      <Text variant="titleLarge">
        You can place your predictions in {count}
      </Text>
    </div>
  );
};

export default NextPredictionsCounter;
