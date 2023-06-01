import React, { useEffect, useRef } from "react";

const CrashCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const positionRef = useRef<number>(0);
  const previousTimeRef = useRef<number | null>(null);

  const animate: FrameRequestCallback = time => {
    // console.log({ time });
    if (previousTimeRef.current && canvasRef.current) {
      const deltaTime = time - previousTimeRef.current;
      // update canvas size
      updateSize();

      const width = canvasRef.current.width;
      const height = canvasRef.current.height;

      const c = canvasRef.current.getContext("2d") as CanvasRenderingContext2D;

      c.clearRect(0, 0, width, height);
      drawAxis(c);
      drawCircle(c, deltaTime);
    }

    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  function start() {
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

  function drawAxis(c: CanvasRenderingContext2D) {
    if (canvasRef.current) {
      const width = canvasRef.current.width;
      const height = canvasRef.current.height;
      const nodesCount = width / 100;
      for (let index = 0; index < nodesCount; index++) {
        c.font = "16px cursive";
        c.textAlign = "center";
        c.fillText(`${index * 3}`, 100 * index + 24, height - 24);
      }
    }
  }
  function drawCircle(c: CanvasRenderingContext2D, deltaTime: number) {
    if (canvasRef.current) {
      const width = canvasRef.current.width;
      const height = canvasRef.current.height;
      const radius = 15;
      const x = positionRef.current + 24;
      c.fillStyle = "violet";
      c.arc(x, height - 24 - radius * 3, radius, 0, Math.PI * 2, false);
      c.fill();
    }
    positionRef.current += deltaTime / 30;
  }
  useEffect(() => {
    if (!canvasRef.current) return;
    const dpi = window.devicePixelRatio;
    canvasRef.current.getContext("2d")?.scale(dpi, dpi);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    start();
  }, []);
  return (
    <div className="relative h-[500px]">
      <canvas ref={canvasRef} className="bg-blue-100" />
    </div>
  );
};

export default CrashCanvas;
