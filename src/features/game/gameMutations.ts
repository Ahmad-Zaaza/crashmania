import {
  CreateGameProps,
  CreateGameRoundProps,
  GameRound,
  IGame,
  Player,
  UpdateGameRoundProps,
  UpdatePlayerEntryProps,
} from "@/lib/gameTypes";
import {
  generateBotEntries,
  generateMultiplier,
  generateUUID,
} from "@/utils/gameHelpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gameQueryKeys } from "./gameQueries";

async function createGame({ players }: CreateGameProps) {
  return new Promise<IGame>((res, rej) => {
    const bots: Player[] = players.filter(p => p.bot);
    const humans: Player[] = players.filter(p => !p.bot);
    const gameId = generateUUID();

    return res({
      gameId,
      players: humans,
      bots,
      rounds: [],
      currentRound: 0,
    });
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
async function createGameRound({ players }: CreateGameRoundProps) {
  return new Promise<GameRound>(res => {
    const bots = players.filter(p => p.bot);
    const humans = players.filter(p => !p.bot);
    const botsEntries = generateBotEntries(bots);
    const humanEntry = { player: humans[0], prediction: 2.25, stake: 250 };
    return res({
      id: generateUUID(),
      state: "pending",
      multiplier: generateMultiplier(),
      entries: [humanEntry, ...botsEntries],
    });
  });
}
async function updateGameRound({ round, state, rounds }: UpdateGameRoundProps) {
  return new Promise<GameRound[]>(res => {
    const roundsCopy = [...rounds];
    const roundIndex = roundsCopy.findIndex(r => r.id === round.id);

    if (roundIndex !== -1) {
      // get the round
      const round = rounds[roundIndex];

      const newRound: GameRound = {
        ...round,
        state,
      };
      roundsCopy.splice(roundIndex, 1, newRound);
      res(roundsCopy);
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
export const useCreateGameRound = () => {
  const queryClient = useQueryClient();
  return useMutation(createGameRound, {
    onSuccess: newRound => {
      const game = queryClient.getQueryData<IGame>(gameQueryKeys.all);

      if (game) {
        queryClient.setQueryData(gameQueryKeys.all, {
          ...game,
          rounds: [...game.rounds, newRound],
        });
      }
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
export const useUpdateGameRound = () => {
  const queryClient = useQueryClient();
  return useMutation(updateGameRound, {
    onSuccess: rounds => {
      const game = queryClient.getQueryData(gameQueryKeys.all);

      if (game) {
        queryClient.setQueryData(gameQueryKeys.all, { ...game, rounds });
      }
    },
  });
};
export const useUpdateScores = () => {
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
