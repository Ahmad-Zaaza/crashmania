import React, { useEffect, useRef } from "react";

const CrashCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const positionRef = useRef<number>(0);
  const previousTimeRef = useRef<number | null>(null);

  const animate: FrameRequestCallback = time => {
    console.log({ time });
    if (previousTimeRef.current && canvasRef.current) {
      const deltaTime = time - previousTimeRef.current;
      const width = canvasRef.current.width;
      const height = canvasRef.current.height;
      const c = canvasRef.current.getContext("2d") as CanvasRenderingContext2D;

      c.moveTo(0, height);
      c.clearRect(0, 0, width, height);
      c.fillRect(0, 0, 100, 100);
      c.beginPath();
      const newX = positionRef.current;
      const newY = positionRef.current;
      c.arc(newX, newY, 25, 0, Math.PI * 2, false);

      c.stroke();
      positionRef.current += deltaTime / 30;
    }

    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  function start() {
    animate(performance.now());
  }

  function draw(c: CanvasRenderingContext2D) {
    const dpi = window.devicePixelRatio;
    c.scale(dpi, dpi);
    // start();

    // for (let index = 0; index < 50; index += 0.1) {
    //     c.beginPath();
    //     c.arc(100, 100, 10, 0, Math.PI * 2, false);
    //     c.stroke();
    // }
  }

  useEffect(() => {
    if (!canvasRef.current) return;
    draw(canvasRef.current.getContext("2d") as CanvasRenderingContext2D);
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="w-full
     bg-blue-100 h-[500px]"
    >
      CrashCanvas
    </canvas>
  );
};

export default CrashCanvas;
