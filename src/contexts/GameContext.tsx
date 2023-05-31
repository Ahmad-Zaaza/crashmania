import { GameSettings, Player } from "@/lib/gameTypes";
import { gameRoundsReducer } from "@/lib/reducers/gameRoundsReducer";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useReducer,
  useState,
} from "react";

type GameContextProps = {
  settings: GameSettings;
  players: Player[];
  bots: Player[];
  setPlayers: Dispatch<SetStateAction<Player[]>>;
  setBots: Dispatch<SetStateAction<Player[]>>;
  setSettings: Dispatch<SetStateAction<GameSettings>>;
};

export const GameContext = createContext<GameContextProps>({
  settings: { speed: 1 },
  bots: [],
  players: [],
  setSettings: () => {},
  setBots: () => {},
  setPlayers: () => {},
});

interface IProps {
  children: ReactNode;
}

const GameContextProvider: React.FC<IProps> = ({ children }) => {
  const [settings, setSettings] = useState<GameSettings>({ speed: 1 });

  const [gameRounds, dispatchGameRounds] = useReducer(gameRoundsReducer, []);

  const [players, setPlayers] = useState<Player[]>([]);
  const [bots, setBots] = useState<Player[]>([]);

  const providerValue = useMemo(() => {
    return {
      bots,
      players,
      settings,
      setSettings,
      setBots,
      setPlayers,
    };
  }, [bots, players, settings]);
  return (
    <GameContext.Provider value={providerValue}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;

export const useGameProvider = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("You need to wrap your element with GameContextProvider");
  }

  return context;
};
