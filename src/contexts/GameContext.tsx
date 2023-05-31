import {
  BotsActions,
  GameRound,
  GameRoundActions,
  GameSettings,
  Player,
} from "@/lib/gameTypes";
import { botsReducer } from "@/lib/reducers/botsReducer";
import { gameRoundsReducer } from "@/lib/reducers/gameRoundsReducer";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

type GameContextProps = {
  settings: GameSettings;
  activeRound: number;
  players: Player[];
  rounds: GameRound[];
  bots: Player[];
  setPlayers: Dispatch<SetStateAction<Player[]>>;
  setSettings: Dispatch<SetStateAction<GameSettings>>;
  setActiveRound: Dispatch<SetStateAction<number>>;
  dispatchBots: Dispatch<BotsActions>;
  dispatchGameRounds: Dispatch<GameRoundActions>;
};

export const GameContext = createContext<GameContextProps>({
  settings: { speed: 1 },
  rounds: [],
  activeRound: 0,
  bots: [],
  players: [],
  setSettings: () => {},
  setPlayers: () => {},
  setActiveRound: () => {},
  dispatchBots: () => [],
  dispatchGameRounds: () => [],
});

interface IProps {
  children: ReactNode;
}

const GameContextProvider: React.FC<IProps> = ({ children }) => {
  const [settings, setSettings] = useState<GameSettings>({ speed: 1 });

  const [gameRounds, dispatchGameRounds] = useReducer(gameRoundsReducer, []);
  const [bots, dispatchBots] = useReducer(botsReducer, []);

  const [players, setPlayers] = useState<Player[]>([]);
  const [activeRound, setActiveRound] = useState(0);

  const providerValue = useMemo(() => {
    return {
      bots,
      players,
      rounds: gameRounds,
      activeRound,
      settings,
      setSettings,
      dispatchBots,
      setPlayers,
      dispatchGameRounds,
      setActiveRound,
    };
  }, [activeRound, bots, gameRounds, players, settings]);

  useEffect(() => {
    if (bots.length === 0) {
      // create 3 bots
      dispatchBots({ type: "CREATE_BOT" });
      dispatchBots({ type: "CREATE_BOT" });
      dispatchBots({ type: "CREATE_BOT" });
    }
  }, [bots]);
  return (
    <GameContext.Provider value={providerValue}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;

export const useGameContext = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("You need to wrap your element with GameContextProvider");
  }

  return context;
};
