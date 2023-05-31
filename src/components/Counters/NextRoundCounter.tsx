import { useEffect } from "react";
import { Text } from "../Text";
import { useCountdown } from "usehooks-ts";

const NextRoundCounter = () => {
  const [count, { startCountdown }] = useCountdown({
    countStart: 10,
    intervalMs: 1000,
  });

  useEffect(() => {
    startCountdown();
  }, []);
  return (
    <div className="absolute inset-0 flex items-center justify-center z-[2] bg-neutral-950 opacity-95">
      <Text variant="titleLarge">Next round starts in {count}</Text>
    </div>
  );
};

export default NextRoundCounter;
