import {
  CreateGameProps,
  GameRound,
  IGame,
  Player,
  UpdatePlayerEntryProps,
} from "@/lib/gameTypes";
import {
  createPlayer,
  createRound,
  generateBotEntries,
  generateUUID,
} from "@/utils/gameHelpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gameQueryKeys } from "./gameQueries";

async function createGame({ noOfBots, player }: CreateGameProps) {
  return new Promise<IGame>((res, rej) => {
    const bots: Player[] = [];
    const gameId = generateUUID();

    for (let index = 0; index < noOfBots; index++) {
      const bot = createPlayer({
        points: 1000,
        bot: true,
        name: `CPU ${index + 1}`,
      });
      bots.push(bot);
    }
    const botsEntries = generateBotEntries(bots);

    const gameRound = createRound([
      { player, prediction: 1.5, stake: 200 },
      ...botsEntries,
    ]);

    return res({ gameId, players: [player], bots, rounds: [gameRound] });
  });
}
async function updatePlayerEntry({
  playerId,
  prediction,
  roundId,
  rounds,
  stake,
}: UpdatePlayerEntryProps) {
  return new Promise<GameRound[]>((res, rej) => {
    const roundsCopy = [...rounds];
    const roundIndex = roundsCopy.findIndex(r => r.id === roundId);

    if (roundIndex !== -1) {
      // get the round
      const round = rounds[roundIndex];

      // get player entry
      const entriesCopies = [...round.entries];
      const entryIndex = entriesCopies.findIndex(e => e.player.id === playerId);
      if (entryIndex !== -1) {
        entriesCopies[entryIndex].prediction = prediction;
        entriesCopies[entryIndex].stake = stake;
        // create new round
        const newRound: GameRound = {
          ...round,
          entries: entriesCopies,
        };
        roundsCopy.splice(roundIndex, 1, newRound);
        res(roundsCopy);
      }
    }
  });
}

export const useCreateGame = () => {
  const queryClient = useQueryClient();
  return useMutation(createGame, {
    onSuccess: game => {
      queryClient.setQueryData(gameQueryKeys.all, game);
    },
  });
};
export const useUpdatePlayerEntry = () => {
  const queryClient = useQueryClient();
  return useMutation(updatePlayerEntry, {
    onSuccess: rounds => {
      const game = queryClient.getQueryData(gameQueryKeys.all);

      if (game) {
        queryClient.setQueryData(gameQueryKeys.all, { ...game, rounds });
      }
    },
  });
};
