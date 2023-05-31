import { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "../Box";
import { Stack } from "../Stack";
import { Button } from "../Button";
import { Text } from "../Text";
import { useGameContext } from "@/contexts/GameContext";
import { useGetGame } from "@/features/game/gameQueries";
import { useUpdatePlayer } from "@/features/players/playersMutations";
import { useUpdateGameRound } from "@/features/game/gameMutations";
import { useGetPlayers } from "@/features/players/playersQueries";

const MultiplierGraph = () => {
  const { settings } = useGameContext();
  const { data: game } = useGetGame();
  const { mutateAsync: updatePlayer } = useUpdatePlayer();
  const { data: players } = useGetPlayers();
  const { mutateAsync: updateRound } = useUpdateGameRound();

  const [count, setCount] = useState(0);
  const [isStopped, setStopped] = useState(true);

  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  const animate: FrameRequestCallback = time => {
    if (previousTimeRef.current && game?.rounds[game.currentRound].multiplier) {
      const deltaTime = time - previousTimeRef.current;

      if (indicatorRef.current) {
        const currentPosition = parseFloat(
          indicatorRef.current.style.insetInlineStart
        );
        const newIndicatorPosition = +(
          currentPosition +
          deltaTime * settings.speed * 0.04
        ).toFixed(2);
        const newCount = +(newIndicatorPosition / 90.9).toFixed(2);

        indicatorRef.current.style.insetInlineStart = `${newIndicatorPosition}px`;
        indicatorRef.current.style.insetBlockEnd = `${
          newIndicatorPosition / 10
        }px`;
        setCount(newCount);

        if (game?.rounds[game.currentRound].multiplier === newCount) {
          onCrash();
          return;
        }
      }
    }

    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  const start = async () => {
    if (game) {
      await updateRound({
        round: game?.rounds[game.currentRound],
        state: "ongoing",
        rounds: game.rounds,
      });
    }
    setStopped(false);
    animate(performance.now());
  };

  const stop = () => {
    if (requestRef.current && previousTimeRef.current) {
      setStopped(true);
      previousTimeRef.current = 0;
      cancelAnimationFrame(requestRef.current);
    }
  };
  const reset = () => {
    stop();
    setCount(0);
    if (indicatorRef.current) {
      indicatorRef.current.style.insetInlineStart = "0px";
      indicatorRef.current.style.insetBlockEnd = "0px";
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
          let newPoints = player.points;
          if (currentRound.multiplier >= playerEntry.prediction) {
            newPoints += playerEntry.prediction * playerEntry.stake;
          } else {
            newPoints -= playerEntry.stake;
          }
          await updatePlayer({ player, newPoints });
        }
      }
    }
  };

  return (
    <Box
      style={{ gridTemplateRows: "auto 1fr auto" }}
      className="grid flex-1 bg-slate-500"
      h="500px"
      w="100%"
    >
      <div>
        <Stack gap={2}>
          <Button onClick={isStopped ? start : stop}>
            {isStopped ? "Start" : "Stop"}
          </Button>
          <Button onClick={reset}>Reset</Button>
          <Text>{game?.rounds[game?.currentRound as number].state}</Text>
          <Text>Total Rounds {game?.rounds.length}</Text>
          <Text>Current round {(game?.currentRound as number) + 1}</Text>
        </Stack>
      </div>
      <div className="relative overflow-hidden">
        <div
          ref={indicatorRef}
          style={{ insetInlineStart: 0 }}
          className="absolute bottom-0 inline h-8 border-l border-red-700"
        >
          {`${count.toFixed(2)} / ${
            game?.rounds[game.currentRound].multiplier
          }`}
        </div>
      </div>
      <Stack py={2}>
        {Array.from(new Array(11).keys()).map(k => (
          <Text className="flex items-center flex-1" key={k}>
            {k}
          </Text>
        ))}
      </Stack>
    </Box>
  );
};

export default MultiplierGraph;
