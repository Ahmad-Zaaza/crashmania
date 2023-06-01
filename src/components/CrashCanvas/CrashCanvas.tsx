import { useGameContext } from "@/contexts/GameContext";
import React, { useEffect, useRef, useState } from "react";
import { Stack } from "../Stack";
import { Button } from "../Button";
import { useGetGame } from "@/features/game/gameQueries";
import { useUpdatePlayer } from "@/features/players/playersMutations";
import { useGetPlayers } from "@/features/players/playersQueries";
import { useUpdateGameRound } from "@/features/game/gameMutations";
import { Text } from "../Text";

const ballRadius = 50;

const CrashCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const { data: game } = useGetGame();
  const [isStopped, setStopped] = useState(true);
  const { mutateAsync: updatePlayer } = useUpdatePlayer();
  const { data: players } = useGetPlayers();
  const { mutateAsync: updateRound } = useUpdateGameRound();
  const ballX = useRef<number>(0);
  const ballY = useRef<number>(0);
  const multiplier = useRef<number>(0);

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

      // if (multiplier.current <= 10 - 0.24) {
      // }
      drawCircle(c);
      if (multiplier.current === game?.rounds[game.currentRound].multiplier) {
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

  function drawCircle(c: CanvasRenderingContext2D, animate = true) {
    if (canvasRef.current) {
      const height = canvasRef.current.height;
      const radius = 50;
      const x = ballX.current + 24;
      const y = ballY.current + height - 24 - radius / 2;
      const image = new Image();
      image.src = "./rocket.svg";
      image.onload = () => {
        c.drawImage(image, x, y, 50, 50);
      };
      c.drawImage(image, x, y, 50, 50);
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

      c.font = "48px nunito";
      c.textAlign = "center";
      c.fillStyle = "white";
      c.fillText(`${multiplier.current}x`, width / 2, height / 2);
    }
  }

  useEffect(() => {
    if (!canvasRef.current) return;
    const dpi = window.devicePixelRatio;
    const c = canvasRef.current.getContext("2d") as CanvasRenderingContext2D;

    c.scale(dpi, dpi);

    updateCanvas();
    function updateCanvas() {
      // c.clearRect(
      //   0,
      //   0,
      //   canvasRef.current?.width as number,
      //   canvasRef.current?.height as number
      // );
      updateSize();
      drawTimeAxis(c);
      drawMultiplierAxis(c);
      drawMultiplier(c);
      drawCircle(c);
    }
    window.addEventListener("resize", updateCanvas);
    return () => window.removeEventListener("resize", updateCanvas);
  }, []);

  function start() {
    reset();
    setStopped(false);
    animate(performance.now());
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

  const onCrash = async () => {
    stop();
    if (game && players) {
      await updateRound({
        round: game?.rounds[game.currentRound],
        state: "finished",
        rounds: game.rounds,
      });
      for (let index = 0; index < players.length; index++) {
        const player = players[index];
        const currentRound = game.rounds[game.currentRound];
        const playerEntry = currentRound.entries.find(
          e => e.player.id === player.id
        );
        if (playerEntry) {
          let wonPoints = 0;
          let newPoints = player.points;
          if (currentRound.multiplier >= playerEntry.prediction) {
            wonPoints = playerEntry.prediction * playerEntry.stake;
            newPoints += wonPoints;
          } else {
            wonPoints = -playerEntry.stake;
            newPoints += wonPoints;
          }
          await updatePlayer({
            player,
            newPoints,
            earnings: player.earnings + wonPoints,
          });
        }
      }
    }
  };
  useEffect(() => {
    if (game) {
      if (game.rounds[game.currentRound].state === "ongoing") {
        start();
      }
    }
  }, [game]);
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
        {/* <Text>{game.rounds[game.currentRound].multiplier}</Text> */}
      </Stack>
    </>
  );
};

export default CrashCanvas;
