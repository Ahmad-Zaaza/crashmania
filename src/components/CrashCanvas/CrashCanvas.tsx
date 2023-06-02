import { useGameContext } from "@/contexts/GameContext";
import { useEffect, useRef, useState } from "react";
import { useRoundEnd } from "@/hooks/useRoundEnd";
import { useCurrentRound } from "@/hooks/useCurrentRound";
import { useCountdown } from "usehooks-ts";

const CrashCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const { onRoundEnd } = useRoundEnd();
  const { currentRound } = useCurrentRound();
  const ballX = useRef<number>(0);
  const ballY = useRef<number>(0);
  const countOver = useRef<boolean>(false);
  const multiplier = useRef<number>(0);

  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: currentRound.crashTime,
    intervalMs: 1000,
  });

  const { settings } = useGameContext();

  const previousTimeRef = useRef<number | null>(null);

  const animate: FrameRequestCallback = time => {
    if (previousTimeRef.current && canvasRef.current) {
      const deltaTime = time - previousTimeRef.current;
      // update canvas size
      updateSize();

      const width = canvasRef.current.width;
      const height = canvasRef.current.height;

      const c = canvasRef.current.getContext("2d") as CanvasRenderingContext2D;

      c.clearRect(0, 0, width, height);
      drawTimeAxis(c);
      drawMultiplierAxis(c);
      drawMultiplier(c);

      const isDone = countOver.current;
      if (multiplier.current <= 10 - 0.24) {
        drawCircle(c, isDone);
      }
      if (isDone) {
        onCrash();
        return;
      }
      multiplier.current = parseFloat((ballY.current / 50).toFixed(2)) * -1;
      ballX.current += deltaTime / 30;
      ballY.current -= deltaTime * settings.speed * 0.01;
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  function drawCircle(c: CanvasRenderingContext2D, crash: boolean) {
    if (canvasRef.current) {
      const height = canvasRef.current.height;
      const width = canvasRef.current.width;
      const radius = crash ? 100 : 50;
      const x =
        ballX.current + radius / 2 > width - 24
          ? width - 24 - radius / 1.5
          : ballX.current + 24 - radius / 1.5;
      const y = ballY.current + height - 24 - radius / 2;
      const rocket = new Image();
      rocket.src = "./rocket.svg";
      const boom = new Image();
      boom.src = "./boom.png";
      rocket.onload = () => {
        if (!crash) {
          c.drawImage(rocket, x, y, radius, radius);
        }
      };
      boom.onload = () => {
        if (crash) {
          c.drawImage(boom, x, y, radius, radius);
        }
      };
      if (crash) {
        c.drawImage(boom, x, y, radius, radius);
      } else {
        c.drawImage(rocket, x, y, radius, radius);
      }
    }
  }

  function updateSize() {
    if (canvasRef.current) {
      canvasRef.current.width = canvasRef.current.parentElement
        ?.offsetWidth as number;
      // get height
      canvasRef.current.height = canvasRef.current.parentElement
        ?.offsetHeight as number;
    }
  }

  function drawTimeAxis(c: CanvasRenderingContext2D) {
    if (canvasRef.current) {
      const width = canvasRef.current.width;
      const height = canvasRef.current.height;
      const nodesCount = width / 100;
      c.fillStyle = "white";
      for (let index = 1; index < nodesCount; index++) {
        c.font = "16px nunito";
        c.textAlign = "center";
        c.fillText(`${index * 3}s`, 100 * index + 24, height - 24);
      }
    }
  }

  function drawMultiplierAxis(c: CanvasRenderingContext2D) {
    if (canvasRef.current) {
      const height = canvasRef.current.height;
      const nodesCount = height / 50;
      c.fillStyle = "white";
      for (let index = 1; index < nodesCount; index++) {
        c.font = "16px nunito";
        c.textAlign = "center";
        c.fillText(
          `${index === 0 ? 0 : `${index}x`}`,
          24,
          height - 24 - 50 * index
        );
      }
    }
  }

  function drawMultiplier(c: CanvasRenderingContext2D) {
    if (canvasRef.current) {
      const width = canvasRef.current.width;
      const height = canvasRef.current.height;

      c.font = "bold 64px nunito";
      c.textAlign = "center";
      c.fillStyle = "white";
      c.fillText(`${multiplier.current.toFixed(2)}x`, width / 2, height / 2);
    }
  }

  useEffect(() => {
    if (!canvasRef.current) return;
    const dpi = window.devicePixelRatio;
    const c = canvasRef.current.getContext("2d") as CanvasRenderingContext2D;

    c.scale(dpi, dpi);

    updateCanvas();
    function updateCanvas() {
      updateSize();
      drawTimeAxis(c);
      drawMultiplierAxis(c);
      drawMultiplier(c);
      drawCircle(c, multiplier.current === currentRound.multiplier);
    }
    window.addEventListener("resize", updateCanvas);
    return () => window.removeEventListener("resize", updateCanvas);
  }, [currentRound.multiplier]);

  function start() {
    countOver.current = false;
    reset();
    animate(performance.now());
  }

  const stop = () => {
    if (requestRef.current && previousTimeRef.current) {
      previousTimeRef.current = 0;
      cancelAnimationFrame(requestRef.current);
    }
  };
  const reset = () => {
    stop();
    resetCountdown();

    if (ballX.current && ballY.current) {
      ballX.current = 0;
      ballY.current = 0;
      previousTimeRef.current = 0;
    }
  };

  const onCrash = async () => {
    stop();
    onRoundEnd();
  };
  useEffect(() => {
    if (currentRound.state === "ongoing") {
      start();
      startCountdown();
    }
  }, [currentRound]);

  useEffect(() => {
    if (count === 0) {
      countOver.current = true;
    }
  }, [count]);
  return (
    <>
      <div className="canvas-background relative h-[550px]">
        <canvas ref={canvasRef} className="bg-black bg-opacity-50" />
      </div>
      {/* <Stack gap={2}>
        <Button onClick={isStopped ? start : stop}>
          {isStopped ? "Start" : "Stop"}
        </Button>
        <Button onClick={reset}>Reset</Button>
        <Text>{currentRound.multiplier}</Text>
      </Stack> */}
    </>
  );
};

export default CrashCanvas;
