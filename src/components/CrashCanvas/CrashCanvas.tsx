import { useGameContext } from "@/contexts/GameContext";
import React, { useEffect, useRef, useState } from "react";
import { Stack } from "../Stack";
import { Button } from "../Button";

const CrashCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const [isStopped, setStopped] = useState(true);
  const ballX = useRef<number>(0);
  const ballY = useRef<number>(0);

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
      drawCircle(c, deltaTime);
      drawMultiplier(c);
      // drawImage(c);
    }

    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  function start() {
    setStopped(false);

    animate(performance.now());
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
  const stop = () => {
    if (requestRef.current && previousTimeRef.current) {
      setStopped(true);
      previousTimeRef.current = 0;
      cancelAnimationFrame(requestRef.current);
    }
  };
  const reset = () => {
    stop();

    if (ballX.current && ballY.current) {
      ballX.current = 0;
      ballY.current = 0;
      previousTimeRef.current = 0;
    }
  };
  function drawTimeAxis(c: CanvasRenderingContext2D) {
    if (canvasRef.current) {
      const width = canvasRef.current.width;
      const height = canvasRef.current.height;
      const nodesCount = width / 100;
      c.fillStyle = "white";
      for (let index = 1; index < nodesCount; index++) {
        c.font = "16px cursive";
        c.textAlign = "center";
        c.fillText(`${index * 3}s`, 100 * index + 24, height - 24);
      }
    }
  }
  function drawMultiplierAxis(c: CanvasRenderingContext2D) {
    if (canvasRef.current) {
      const width = canvasRef.current.width;
      const height = canvasRef.current.height;
      const nodesCount = height / 50;
      c.fillStyle = "white";
      for (let index = 1; index < nodesCount; index++) {
        c.font = "16px cursive";
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

      c.font = "48px cursive";
      c.textAlign = "center";
      const ballRadius = 15;

      const h = height - 24 - ballRadius / 2;
      c.fillStyle = "white";
      c.fillText(
        `${((h - ballY.current - h) / 50).toFixed(2)}x`,
        width / 2,
        height / 2
      );
    }
  }
  function drawCircle(c: CanvasRenderingContext2D, deltaTime: number) {
    if (canvasRef.current) {
      const height = canvasRef.current.height;
      const radius = 15;
      const x = ballX.current + 24;
      const y = ballY.current + height - 24 - radius / 2;

      c.fillStyle = "red";
      c.arc(x, y, radius, 0, Math.PI * 2, false);
      c.fill();
      c.beginPath();
      c.moveTo(x, y);
      c.lineTo(x, y);
      c.strokeStyle = "black";
      c.stroke();
    }
    ballX.current += deltaTime / 30;
    ballY.current -= deltaTime * settings.speed * 0.01;
  }

  useEffect(() => {
    if (!canvasRef.current) return;
    updateSize();
    const dpi = window.devicePixelRatio;
    const c = canvasRef.current.getContext("2d") as CanvasRenderingContext2D;

    c.scale(dpi, dpi);
    drawTimeAxis(c);
    drawMultiplierAxis(c);
    drawCircle(c, 0);
    function updateCanvas() {
      updateSize();
      drawTimeAxis(c);
      drawMultiplierAxis(c);
      drawCircle(c, 0);
    }
    window.addEventListener("resize", updateCanvas);
    return () => window.removeEventListener("resize", updateCanvas);
  }, []);

  return (
    <>
      <div className="canvas-background relative h-[550px]">
        <canvas ref={canvasRef} className="bg-black bg-opacity-50" />
      </div>
      <Stack gap={2}>
        <Button onClick={isStopped ? start : stop}>
          {isStopped ? "Start" : "Stop"}
        </Button>
        <Button onClick={reset}>Reset</Button>
      </Stack>
    </>
  );
};

export default CrashCanvas;
