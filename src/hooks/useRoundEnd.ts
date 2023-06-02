import { useUpdateGameRound } from "@/features/game/gameMutations";
import { useGetGame } from "@/features/game/gameQueries";
import { useUpdatePlayer } from "@/features/players/playersMutations";
import { useGetPlayers } from "@/features/players/playersQueries";
import { MutableRefObject } from "react";

export const useRoundEnd = (crashPoint: MutableRefObject<number>) => {
  const { data: game } = useGetGame();
  const { mutateAsync: updatePlayer } = useUpdatePlayer();
  const { data: players } = useGetPlayers();
  const { mutateAsync: updateRound } = useUpdateGameRound();

  async function onRoundEnd() {
    if (game && players) {
      await updateRound({
        round: game?.rounds[game.currentRound],
        state: "finished",
        rounds: game.rounds,
        multiplier: crashPoint.current,
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
          if (crashPoint.current >= playerEntry.prediction) {
            wonPoints = playerEntry.prediction * playerEntry.stake;
            newPoints += wonPoints;
          } else {
            wonPoints = -playerEntry.stake;
            newPoints += wonPoints;
          }
          await updatePlayer({
            player,
            newPoints: parseFloat(newPoints.toFixed(2)),
            earnings: parseFloat((player.earnings + wonPoints).toFixed(2)),
          });
        }
      }
    }
  }

  return { onRoundEnd };
};
