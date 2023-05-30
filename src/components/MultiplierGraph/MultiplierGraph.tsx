import { useEffect, useRef, useState } from "react";
import { Box } from "../Box";
import { Stack } from "../Stack";
import { Button } from "../Button";
import { Text } from "../Text";

const speedFactor = 0.15;

const MultiplierGraph = () => {
  const [count, setCount] = useState(0);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  const [speed, setSpeed] = useState(speedFactor);

  const animate: FrameRequestCallback = time => {
    if (previousTimeRef.current) {
      const deltaTime = time - previousTimeRef.current;
      if (indicatorRef.current) {
        const currentPosition = parseInt(
          indicatorRef.current.style.insetInlineStart,
          10
        );
        indicatorRef.current.style.insetInlineStart = `${
          (currentPosition + deltaTime * speed) % 1000
        }px`;
        setCount(count => (count + deltaTime * 0.001 * currentPosition) % 10);
      }
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestRef.current as number);
  }, [speed]);

  const value = Math.random() * 10;
  return (
    <Box
      style={{ gridTemplateRows: "auto 1fr auto" }}
      className="grid bg-slate-500"
      h="500px"
      w="1000px"
    >
      <div>
        {count.toFixed(2)}
        <Stack gap={2}>
          <Button onClick={() => setSpeed(speedFactor * 1)}>1x</Button>
          <Button onClick={() => setSpeed(speedFactor * 2)}>2x</Button>
          <Button onClick={() => setSpeed(speedFactor * 3)}>3x</Button>
          <Button onClick={() => setSpeed(speedFactor * 4)}>4x</Button>
          <Button onClick={() => setSpeed(speedFactor * 5)}>5x</Button>
        </Stack>
      </div>
      <div className="relative overflow-hidden">
        <div
          ref={indicatorRef}
          style={{ insetInlineStart: 0 }}
          className="absolute bottom-0 w-8 h-8 bg-green-700 rounded-full"
        ></div>
      </div>
      <Stack p={2}>
        {Array.from(new Array(10).keys()).map(k => (
          <Text className="flex items-center justify-center flex-1" key={k}>
            {k + 1}
          </Text>
        ))}
      </Stack>
    </Box>
  );
};

export default MultiplierGraph;
