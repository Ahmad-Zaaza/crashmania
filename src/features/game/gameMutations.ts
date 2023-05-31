import { CreateGameProps, IGame, Player, RoundEntry } from "@/lib/gameTypes";
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

    const gameRound = createRound(botsEntries);

    res({ gameId, players: [player], bots, rounds: [gameRound] });
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
