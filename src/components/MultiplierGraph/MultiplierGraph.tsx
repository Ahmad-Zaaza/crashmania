import { useEffect, useRef, useState } from "react";
import { Box } from "../Box";
import { Stack } from "../Stack";
import { Button } from "../Button";
import { Text } from "../Text";

const speedFactor = 0.05;
const MultiplierGraph = () => {
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  const crashPointRef = useRef<number | null>(null);

  const [speed, setSpeed] = useState(speedFactor);

  const animate: FrameRequestCallback = time => {
    if (previousTimeRef.current && crashPointRef.current) {
      const deltaTime = time - previousTimeRef.current;
      if (indicatorRef.current) {
        const currentPosition = parseFloat(
          indicatorRef.current.style.insetInlineStart
        );
        const newIndicatorPosition = +(
          currentPosition +
          deltaTime * speed
        ).toFixed(2);
        const newCount = +(newIndicatorPosition / 90).toFixed(2);

        // console.log({ newPosition });
        indicatorRef.current.style.insetInlineStart = `${newIndicatorPosition}px`;
        setCount(newCount);
        // console.log("Crashpoint:%f", crashPointRef.current);
        console.log("count:%f", newCount);
        // console.log(+(newCount).toFixed(2) % crashPointRef.current);
        if (crashPointRef.current === newCount) {
          console.log("Reached");
          cancelAnimationFrame(requestRef.current as number);
          //   return;
        }
      }
    }

    if (running) {
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (running) {
      requestRef.current = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(requestRef.current as number);
  }, [speed, running]);

  useEffect(() => {
    const value = +(Math.random() * 10).toFixed(2);
    crashPointRef.current = value;
  }, []);
  return (
    <Box
      style={{ gridTemplateRows: "auto 1fr auto" }}
      className="grid bg-slate-500"
      h="500px"
      w="1000px"
    >
      <div>
        {count.toFixed(2)} / {crashPointRef.current}
        <Stack gap={2}>
          <Button onClick={() => setSpeed(speedFactor * 1)}>1x</Button>
          <Button onClick={() => setSpeed(speedFactor * 1.5)}>2x</Button>
          <Button onClick={() => setSpeed(speedFactor * 2)}>3x</Button>
          <Button onClick={() => setSpeed(speedFactor * 2.5)}>4x</Button>
          <Button onClick={() => setSpeed(speedFactor * 3)}>5x</Button>
          <Button onClick={() => setRunning(!running)}>
            {running ? "Stop" : "Start"}
          </Button>
        </Stack>
      </div>
      <div className="relative overflow-hidden">
        <div
          ref={indicatorRef}
          style={{ insetInlineStart: 0 }}
          className="absolute bottom-0 w-8 h-8 bg-green-700 rounded-full"
        ></div>
      </div>
      <Stack py={2}>
        {Array.from(new Array(11).keys()).map(k => (
          <Text className="flex items-center flex-1 border" key={k}>
            {k}
          </Text>
        ))}
      </Stack>
    </Box>
  );
};

export default MultiplierGraph;
