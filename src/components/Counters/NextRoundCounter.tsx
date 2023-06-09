import { useEffect } from "react";
import { useCountdown } from "usehooks-ts";
import { Button } from "../Button";

interface IProps {
  onCounterFinish: VoidFunction;
}

const NextRoundCounter = ({ onCounterFinish }: IProps) => {
  const [count, { startCountdown }] = useCountdown({
    countStart: 3,
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
    <Button disabled size="large">
      Next round will start in {count}
    </Button>
  );
};

export default NextRoundCounter;
